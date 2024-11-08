import z from "zod";

export const CreationTransactionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  paymentType: z.enum(["cash", "card", "other"]),
  category: z.string().min(1, "Category is required"),
  amount: z.number().positive("Amount must be positive"),
  location: z.string().optional(),
  date: z.string().min(1, "Date is required"),
});
