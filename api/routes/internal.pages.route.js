import express from "express";
import UserController from "../controllers/users.controller.js";
import bodyParser from "body-parser";
import Authorize from "../auth/authorization.js";
import PagesController from "../controllers/public.pages.controller.js";
import AdminController from "../controllers/admin.controller.js";
import NewArticlesCTRL from "../controllers/newarticles.controller.js";

/**
 * This file controls all routes on the internally
 * facing side of the website. (i.e. pages and routes
 * that require authentication to access).
 *
 * To add a route protected by permissions:
 *
 * 1.
 * You must first create the route. The first middleware
 * function should be a callback. The body of the callback
 * should call the Authorize.auth method, passing all callback
 * parameters, as well as the protected route name
 * (that you come up with).
 *
 * 2.
 * Add your permission to to the ProtectedRoutes static field.
 * The name of the permission should be the same as the protected
 * route name. Here you get to decide which account types get
 * access to this route.
 *
 * Look below if you are confused.
 */

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

/* Profile Router */
router.route("/profile").get((req, res, next) => {
  Authorize.auth(req, res, next, "GET profile");
}, PagesController.getProfile);

/* New User Approval Router */
router
  .route("/approve-user")
  .get((req, res, next) => {
    Authorize.auth(req, res, next, "GET approve-user");
  }, AdminController.getUserApprovals)
  .post((req, res, next) => {
    Authorize.auth(req, res, next, "POST approve-user");
  }, AdminController.postUserApprovals);

router
  .route("/submit-article")
  .get((req, res, next) => {
    Authorize.auth(req, res, next, "GET submit-article");
  }, NewArticlesCTRL.apiGetPostArticlePage)
  .post((req, res, next) => {
    Authorize.auth(req, res, next, "POST submit-article");
  }, NewArticlesCTRL.apiPostArticle);


/* Deactivate Account Router From /profile Page */
router
  .route("/deactivate-profile")
  //.get(PagesController.getDeactivateProfile);
  .get((req, res, next) => {
    Authorize.auth(req, res, next, "GET deactivate-profile");
  }, PagesController.getDeactivateProfile) 
  /*.post((req, res, next) => {
    Authorize.auth(req, res, next, "POST deactivate-profile");
  }, ??????);*/
 

/* Deactivate Account Router From /deactivate Page */
router
  .route("/deactivate")
  .get((req, res, next) => {
    Authorize.auth(req, res, next, "GET deactivate");
  }, PagesController.getDeactivate)
  /*.post((req, res, next) => {
    Authorize.auth(req, res, next, "POST ??????");
  }, ??????);
 */

/* Delete Account Router From /profile Page */
router
.route("/delete-profile")
//.get(PagesController.getDeactivateProfile);
.get((req, res, next) => {
  Authorize.auth(req, res, next, "GET delete-profile");
}, PagesController.getDeleteProfile) 
/*.post((req, res, next) => {
  Authorize.auth(req, res, next, "POST deactivate-profile");
}, ??????);*/


/* Deactivate Account Router From /deactivate Page */
router
.route("/delete")
.get((req, res, next) => {
  Authorize.auth(req, res, next, "GET delete");
}, PagesController.getDelete)
/*.post((req, res, next) => {
  Authorize.auth(req, res, next, "POST ??????");
}, ??????);
*/

export default router;
