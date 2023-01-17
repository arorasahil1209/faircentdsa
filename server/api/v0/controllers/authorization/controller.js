//import TokenModel from "../../../../models/tokenManagement";
import AdminModel from "../../../../models/admin";
import UserRolePrivilegeModel from "../../../../models/role_privilege";
import { countDocuments, findOne, aggrigate } from "../../services/common.services";
import jwt from 'jsonwebtoken';
let appConfig = require('config');
let secret = process.env.secret || appConfig.get('jwtsecret');
import mongoose from 'mongoose';
const db = require("../../../../models");
const TokenModel = db.token;

export class AuthorizationController {
    async verifyToken(request, response, next) {
        try {
            let authorization = request.headers['authorization']
            if (!authorization) {
                return response.status(401).json({
                    message: "Unauthorized Token.",
                    statusCode: 401
                })
            } else {
                let tokenInfo = await jwt.verify(authorization.replace('Bearer', '').trim(), secret);
                tokenInfo.token = authorization.replace('Bearer', '').trim()
                let _model = new AgentModel().model;
                if (tokenInfo && tokenInfo.user_type == 'admin') {
                    _model = new AdminModel().model;
                }

                let _token = new TokenModel().model;
                let condition = { user_id: tokenInfo.user_id, token: tokenInfo.token }
                let tokenCount = await countDocuments(_token, condition)
                condition = { _id: tokenInfo.user_id, is_active: true, is_deleted: false }
                let userCount = await countDocuments(_model, condition)
                let userAccessRoles = null
                if (tokenInfo.assigned_role_id) {
                    condition = { role_id: mongoose.Types.ObjectId(tokenInfo.assigned_role_id) }
                    let _userAccessRoles = new UserRolePrivilegeModel().model;
                    let mapping = [
                        {
                            $lookup: {
                                from: "permission",
                                localField: "permission_id",
                                foreignField: "_id",
                                as: "permission_details",
                            },
                        },
                        {
                            $unwind: { "path": "$permission_details" }//, "preserveNullAndEmptyArrays": true
                        },
                    ]
                    userAccessRoles = await aggrigate(_userAccessRoles, condition, mapping);
                }

                if (tokenCount && userCount) {
                    request.decoded = tokenInfo
                    request.decoded.access_role = userAccessRoles
                    next()
                } else {
                    return response.status(401).json({
                        message: "Unauthorized Access",
                        statusCode: 401
                    })
                }
            }
        } catch (error) {
            return response.status(401).json({
                message: "Unauthorized Token.",
                statusCode: 401
            })
        }
    }
    //user authentication
    // async userAuthenticate(req, res, next) {
    //     // check header or url parameters or post parameters for token
    //     var token = req.headers['x-access-token'] || req.headers['authorization'];;
    //     // decode token
    //     if (token) {
    //         // verifies secret and checks exp
    //         jwt.verify(token, appConfig.secret, function (err, decoded) {
    //             if (err) {
    //                 req.errorMsg = 'Failed to authenticate token.'
    //                 req.statusCode = 401
    //                 utils.failure(req, res)
    //             } else {
    //                 //if everything is good, save to request for use in other routes
    //                 StudentModel.findOne({ _id: ObjectID(decoded.userId), is_active: true, user_type: 'user' }, function (err, userInfo) {
    //                     if (err) {
    //                         req.errorMsg = 'Failed to authenticate access.'
    //                         req.statusCode = 401
    //                     }
    //                     else if (userInfo == null) {
    //                         req.errorMsg = 'Failed to authenticate access.'
    //                         req.statusCode = 401
    //                         utils.failure(req, res)
    //                     }
    //                     else {
    //                         TokenModel.findOne({ user_id: userInfo._id }, function (err, userInfo) {
    //                             if (err) {
    //                                 req.errorMsg = 'Failed to authenticate access.'
    //                                 req.statusCode = 401
    //                             }
    //                             else if (userInfo == null) {
    //                                 req.errorMsg = 'Failed to authenticate access.'
    //                                 req.statusCode = 401
    //                                 utils.failure(req, res)
    //                             } else {
    //                                 req.decoded = decoded;
    //                                 next();
    //                             }
    //                         })
    //                     }
    //                 })
    //             }
    //         });
    //     } else {
    //         // if there is no token
    //         // return an error
    //         req.errorMsg = 'No token provided.'
    //         req.statusCode = 401
    //         utils.failure(req, res)
    //     }
    // }
    async onlyAdmin(request, response, next) {
        let tokenInfo = request.decoded
        if (tokenInfo && tokenInfo.user_type != 'admin') {
            return response.status(401).json({
                message: "Unauthorized Access",
                statusCode: 401
            })
        } else {
            next()
        }
    }
    async verifyModulePermission(request, response, next) {
        let access_role = (request.decoded.access_role && request.decoded.access_role.length) ? request.decoded.access_role : null
        if (access_role) {
            let permission_details = access_role.some(function (el) {
                if (el.permission_details.title_key === request.module_name) {
                    request.permission_details = el.permission_details
                    return true
                }

            });
            if (permission_details) {
                next()
            }
            else
                return response.status(401).json({
                    message: "Unauthorized Access",
                    statusCode: 401
                })
        } else {
            return response.status(401).json({
                message: "Unauthorized Access",
                statusCode: 401
            })
        }
    }
    async UserManagement(request, response, next) {
        request.module_name = "user"
        next()
    }
    async StaticContentManagement(request, response, next) {
        request.module_name = "static_content"
        next()
    }
    async RolesAndAccessManagement(request, response, next) {
        request.module_name = "roles_and_access"
        next()
    }

    async authorizeAddRole(request, response, next) {
        if (request.permission_details) {
            let rolesInfo = request.permission_details
            if (rolesInfo && rolesInfo.can_add) {
                next()
            } else {
                return response.status(401).json({
                    message: "Unauthorized Access",
                    statusCode: 401
                })
            }
        }
        else {
            return response.status(401).json({
                message: "Unauthorized Access",
                statusCode: 401
            })
        }
    }
    async authorizeEditRole(request, response, next) {
        if (request.permission_details) {
            let rolesInfo = request.permission_details
            if (rolesInfo && rolesInfo.can_edit) {
                next()
            } else {
                return response.status(401).json({
                    message: "Unauthorized Access",
                    statusCode: 401
                })
            }
        }
        else {
            return response.status(401).json({
                message: "Unauthorized Access",
                statusCode: 401
            })
        }
    }
    async authorizeViewRole(request, response, next) {
        if (request.permission_details) {
            let rolesInfo = request.permission_details
            if (rolesInfo && rolesInfo.can_view) {
                next()
            } else {
                return response.status(401).json({
                    message: "Unauthorized Access",
                    statusCode: 401
                })
            }
        }
        else {
            return response.status(401).json({
                message: "Unauthorized Access",
                statusCode: 401
            })
        }
    }
    async authorizeDeleteRole(request, response, next) {
        if (request.permission_details) {
            let rolesInfo = request.permission_details
            if (rolesInfo && rolesInfo.can_delete) {
                next()
            } else {
                return response.status(401).json({
                    message: "Unauthorized Access",
                    statusCode: 401
                })
            }
        }
        else {
            return response.status(401).json({
                message: "Unauthorized Access",
                statusCode: 401
            })
        }
    }
}

export default new AuthorizationController();
