import { users } from "../dummyData/data.js";

const userResolver = {
    Query: {
        users: () => {
            return users;  // This should return the full users array
        },
        user: (_, { userId }) => {
            return users.find((user) => user._id === userId);  // Correct comparison with '==='
        },
    },
    Mutation: {},
};

export default userResolver;