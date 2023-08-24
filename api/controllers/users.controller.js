dotenvConfig(); // load .env variables
import { config as dotenvConfig } from "dotenv";
import UsersAccessor from "../database_accessor/users.accessor.js";
import bcrypt from "bcryptjs"; // import bcrypt to hash passwords
import jwt from "jsonwebtoken"; // import jwt to sign tokens

/**
 * UsersCTRL Class
 * 
 * This class controls the behaviour of any web request
 * related to Users.
 */
export default class UsersCTRL {
    /**
     * apiPostLogin Method
     * 
     * This method checks whether or not the request
     * to sign in is valid. Utilizes the getUserByUsername
     * UserAccessor method to accomplish this.
     * 
     * @param {*} req web request object
     * @param {*} res web response
     */
    static async apiPostLogin(req, res) {
        try {
            // check if the user exists
            const user = await UsersAccessor.getUserByUsername(
                req.body.username
            );
            if (user) {
                //check if password matches
                const result = await bcrypt.compare(
                    req.body.password,
                    user.password
                );
                if (result) {
                    // sign token and send it in response
                    const token = await jwt.sign(
                        { username: user.username },
                        process.env.TOKEN_KEY
                    );
                    //need to send the token to the authorization header
                    res.json({ token });
                } else {
                    res.status(400).json({ error: "password doesn't match" });
                }
            } else {
                res.status(400).json({ error: "User doesn't exist" });
            }
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    /**
     * apiPostSignUp Method
     * 
     * This method adds a new user to the unregistered user
     * collection in the user database. It accomplishes this
     * by calling the user.accessor.js file and creating a new
     * user with the existing req data.
     * 
     * @param {*} req web request information for signup
     * @param {*} res weh response object
     */
    static async apiPostSignUp(req, res) {
        try {
            console.log("Sign up username: " + req.body.username);
            console.log("Sign up password: " + req.body.password);
            // hash the password
            req.body.password = await bcrypt.hash(req.body.password, 10);
            
            // make sure nested data is structured properly
            req.body.information = {
                year: req.body.year,
                major: req.body.major,
                bio: req.body.bio,
                image: req.body.image,
            }
            
            // create a new user in database
            const user = await UsersAccessor.createUser(req.body);
            // send new user as response
            res.json(user);
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}
