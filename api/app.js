import express from "express";
import cors from "cors";
import helmet from "helmet";
import pagesRouter from "./routes/pages.route.js";
import articlesRouter from "./routes/articles.route.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import MongoStore from "connect-mongo";
import auth from "./authenticator/authentication.js";
import Connection from "./db/connection.js";
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
app.use(cookieParser());
app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use("/public", express.static(process.cwd() + "/public"));

app.use("/articles", articlesRouter);

//const connection = Connection.open("session");

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER } = process.env;
const DATABASE_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.xtdufxk.mongodb.net/?retryWrites=true&w=majority`;


app.use(sessions({
    store: new MongoStore({mongoUrl: DATABASE_URL}),
    secret: process.env.TOKEN_KEY,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 5 }, //5 minutes session
    resave: false
}));

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get("/profile", (req, res) => {
    console.log(req.sessionID);
    if(req.sessionID) {
        res.render('profile', {loggedIn: "yes"});
    } else {
        res.render('profile', {loggedIn: "no"});
    }
});

//Need to figure out how to make this compatinle with Express Router Object
// app.get("/profile", auth, (req, res) => {
//     res.render('profile', {loggedIn: "yes"});
//   });

  /*
   * Need to figure out how to utilize the existing authentication 
   * for this user session model.
   */
app.use("/", pagesRouter);

export default app;
