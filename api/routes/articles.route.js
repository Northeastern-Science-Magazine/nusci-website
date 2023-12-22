/** REQUIRES REWORK */

import express from "express";
import ArticlesCTRL from "../controllers/articles.controller.js";
import catchError from "../error/error.handler.js";

/* Controls Routing for Finished Articles */

const router = express.Router();

//any valid ID of an article should work... ID or NAME perhaps
router.route("/:id").get(ArticlesCTRL.apiGetArticle);

router.route("/").get(ArticlesCTRL.apiGetArticles);

export default router;
