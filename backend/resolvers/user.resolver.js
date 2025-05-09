
import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";

const userResolver = {
    Mutation: {
        signup: async (_, { input }, context) => {
            try {
                const { username, name, password, gender } = input
                if (!username || !name || !password || !gender) throw new Error("All fields are required!")
                console.log('someerror?',)
                const exitedUser = await User.findOne({ username })
                console.log('after?',)
                if (exitedUser) throw new Error("User with this username already exists")

                const salt = await bcryptjs.genSalt(10)
                const hashPassword = await bcryptjs.hash(password, salt)
                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

                const newUser = new User({
                    username,
                    name,
                    password: hashPassword,
                    gender,
                    profilePicture: gender === "Male" ? boyProfilePic : girlProfilePic
                })

                await newUser.save()
                await context.login(newUser)
                return newUser
            } catch (error) {
                console.error(`Error in signup`, error)
                throw new Error(error.message || 'Internal server error')
            }
        },
        login: async (_, { input }, context) => {
            try {
                const { username, password } = input
                const { user } = await context.authenticate('graphql-local', { username, password })
                await context.login(user)

                return user
            } catch (error) {
                console.error('Error in login', error)
                throw new Error(error.message || 'Internal server error')
            }
        },
        logout: async (parent, _, context) => {
            try {
                await context.logout()
                context.req.session.destroy((err) => {
                    if (err) throw err
                })
                context.res.clearCookie("connect.sid")
                return { message: "Logged out successfully" }
            } catch (error) {
                console.error('Error in logout', error)
                throw new Error(error.message || 'Internal server error')
            }
        }
    },
    Query: {
        authUser: async (parent, _, context) => {
            try {
                const user = await context.getUser()
                return user;
            } catch (error) {
                console.error("Error in authUser", error)
                throw new Error("Internal server error")
            }
        },
        user: async (_, { userId }) => {
            try {
                const user = await User.findById(userId);
                return user;
            } catch (error) {
                console.error("Error in user", error)
                throw new Error("Internal server error")
            }
        },
    },
    // todo -> todo transaction relations
};

export default userResolver;