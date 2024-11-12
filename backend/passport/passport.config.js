import passport from "passport";
import bcryptjs from "bcryptjs";

import User from "../models/user.models.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            try {   
                const user = await User.findOne({ username })
                if (!user) throw new Error("Invalid username or password")

                const validPassword = await bcryptjs.compare(password, user.password)

                if (!validPassword) throw new Error("Invalid username or password")

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        })
    )
    passport.serializeUser((user, done) => {
        console.log("Serializing user")
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        console.log(`Deserializing user`)
        try {
            const user = await User.findById(id)
            done(null, user)
        } catch (err) {
            done(err)
        }
    })


}

