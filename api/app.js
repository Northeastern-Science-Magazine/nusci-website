import express from "express";
import cors from "cors";
import helmet from "helmet";
import pagesRouter from "./routes/pages.route.js";
import articlesRouter from "./routes/articles.route.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import auth from "./authenticator/authentication.js";
//import articles from './routes/articles.route.js'

/**
 * This file controls the express server and
 * lets the server use everything it needs to
 * in order to function. 
 */

const app = express();

app.set("view engine", "ejs");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use("/public", express.static(process.cwd() + "/public"));

app.use("/", pagesRouter);

app.use("/articles", articlesRouter);

//Need to figure out how to make this compatinle with Express Router Object
app.get("/profile", auth, (req, res) => {
    res.render('profile', {loggedIn: "yes"});
  });

export default app;
