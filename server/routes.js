//import authenticationController0 from "./api/v0/controllers/authentication/controller";
import authorizationController from "./api/v0/controllers/authorization/controller";
import RolesAndAccessRouter0 from "./api/v0/controllers/rolesAndAccess/routes";
import LeadRouter0 from "./api/v0/controllers/lead/routes";
import UserRouter0 from "./api/v0/controllers/user/routes";
import DashboardRouter0 from "./api/v0/controllers/dashboard/routes";
import CityRouter0 from "./api/v0/controllers/city/routes";
/**
 *
 *
 * @export
 * @param {any} app
 */

export default function routes(app) {
  var unless = function (middleware, ...paths) {
    return function (req, res, next) {
      console.log(paths, req.path);
      const pathCheck = paths.some((path) => path === req.path);
      pathCheck ? next() : middleware(req, res, next);
    };
  };

  /*------------v0 routes--------------------*/
  app.use(
    "/v0/admin/rolesandaccess",
    //authorizationController.RolesAndAccessManagement,
    RolesAndAccessRouter0
  )
  app.use(
    "/v0/lead",
    //authorizationController.RolesAndAccessManagement,
    LeadRouter0
  )
  app.use(
    "/v0/user",
    UserRouter0
  )
  app.use(
    "/v0/dashboard",
    DashboardRouter0
  )
  app.use(
    "/v0/city",
    CityRouter0
  )
  return app;
}
