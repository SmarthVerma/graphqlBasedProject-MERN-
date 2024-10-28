import Transaction from "../models/transactional.models"

const transactionResolver = {
    Query: {
        transactions: async (_, _, context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthorized")
                const userId = await context.getUser()._id

                const transactions = await Transaction.find({ userId });
                return transactions
            } catch (error) {
                console.error("Error getting transactions", error)
                throw new Error(error.message || "Internal server error")
            }
        },
        transaction: async (_, { transactionId }) => {
            try {
                const transaction = await Transaction.findById(transactionId);
                return transaction;
            } catch (error) {
                console.error("Error getting transactions using id", error)
                throw new Error(error.message || "Internal server error")
            }
        }
        // TODO-> add category statistivcs
    },
    Mutation: {
        createTransaction: async (_, { input }, context) => {
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id
                })
                await newTransaction.save()
                return newTransaction;
            } catch (error) {
                console.error("Error creating transaction", error)
                throw new Error(error.message || "Internal server error")
            }
        },
        updateTransaction: async (_, { input }) => {
            try {
                const updatedTransaction = await Transaction.findByIdAndUpdate(
                    input.transactionId,
                    input,
                    { new: true })
                return updatedTransaction;
            } catch (error) {
                console.error("Error updating transaction", error)
                throw new Error(error.message || "Internal server error")
            }
        },
        deleteTransaction: async (_, { transactionId }) => {
            try {
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId)
                return deletedTransaction
            } catch (error) {
                console.error("Error deleting transaction", error)
                throw new Error(error.message || "Internal server error")
            }
        },
    }
}

export default transactionResolver 