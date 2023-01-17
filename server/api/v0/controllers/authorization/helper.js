import AgentModel from "../../../../models/student";
import AdminModel from "../../../../models/student";
import DistributorModel from "../../../../models/student";
import ManagerModel from "../../../../models/student";
import TokenModel from "../../../../models/tokenManagement";
import jwt from 'jsonwebtoken';
let appConfig = require('config');
let secret = process.env.secret || appConfig.get('jwtsecret');

export class AuthorizationHelper {
    async isToken(request, response, next) {
        try {
            let authorization = request.headers['authorization']
            if (!authorization) {
                return response.status(401).json({
                    message: "Unauthorized Token.",
                    statusCode: 401
                })
            }
            request.decoded = await jwt.verify(authorization.replace('Bearer', '').trim(), secret);
            next()
        } catch (error) {
            return response.status(401).json({
                message: "Unauthorized Token.",
                statusCode: 401
            })
        }
    }
    authorizeUser(request, response, next) {
        console.log("in authorize user")
        if (!request.decoded.userId) {
            return response.status(401).json({
                message: "Unauthorized.UserId not found",
                statusCode: 401
            })
        }
        let role = request.decoded.role;
        if (role == "student") {
            next();
        } else {
            return response.status(401).json({
                message: "Unauthorized",
                statusCode: 401
            })
        }
    }

    authorizeRoles(request, response, next, roles) {

        if (roles && roles.length && roles.includes(request.decoded.role)) {
            next();
        } else {
            return response.status(401).json({
                message: "Unauthorized",
                statusCode: 401
            })
        }
    }
}

export default new AuthorizationHelper();
