import { MovingBorder } from "@/components/MovingBorder";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CATEGORY_STYLES, EXPENSE, SAVING } from "@/constants/constant";
import { CREATE_TRANSACTION } from "@/graphql/mutations/transaction.mutation";
import { GET_ALL_TRANSACTION } from "@/graphql/queries/transactions.query";
import { CreationTransactionSchema } from "@/schemas/TransactionSchema";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
// Define schema using zod based on the CreateTransactionInput

function TransactionForm() {
  const [categoryStyles, setCategoryStyles] = useState<any>({});

  const form = useForm<z.infer<typeof CreationTransactionSchema>>({
    resolver: zodResolver(CreationTransactionSchema),
    defaultValues: {
      description: "",
      paymentType: "Cash",
      category: "",
      amount: 0,
      location: "",
      date: "",
    },
  });

  const { watch } = form;
  const category = watch("category");
  // console.log("this is category", category);

  useEffect(() => {
    if (category) {
      if (category == SAVING) setCategoryStyles(CATEGORY_STYLES.SAVING);
      else if (category == EXPENSE) setCategoryStyles(CATEGORY_STYLES.EXPENSE);
      else setCategoryStyles(CATEGORY_STYLES.INVESTMENT);
    }
  }, [category]);

  // console.log("cartygoryStyle", categoryStyles);
  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [GET_ALL_TRANSACTION],
  });
  const onSubmit = async (data: z.infer<typeof CreationTransactionSchema>) => {
    console.log("Transaction Data:", data);
    // Force category to EXPENSE
    data.amount = Number(data.amount);
    try {
      console.log("Transaction createded inputData", data);
      await createTransaction({ variables: { input: data } });
      form.reset();
      setCategoryStyles({});
      toast.success("Transaction created successfully!");
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error("Failed to create transaction. Please try again.");
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center my-8">
      <div className="bg-gradient-to-r from-black to-gray-950 p-8 rounded-lg shadow-lg border border-gray-700 max-w-5xl  w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Add a New
          <span className="text-orange-400 inline text-3xl"> Transaction</span>
        </h1>
        <div className="w-full flex justify-center">
          <MovingBorder>
            <p className="text-center p-2 text-gray-600 dark:text-gray-400">
              Track your expenses effectively and take control of your spending.
            </p>
          </MovingBorder>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 border rounded-xl p-4 grid grid-cols-3 gap-3"
          >
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-gray-700 dark:text-white"
                        placeholder="Enter a description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Type</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          style={categoryStyles}
                          className={`w-[180px] dark:bg-gray-700 dark:text-white `}
                        >
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent className={` dark:text-white`}>
                          <SelectItem value="SAVING">Saving</SelectItem>
                          <SelectItem value="EXPENSE">Expense</SelectItem>
                          <SelectItem value="INVESTMENT">Investment</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="paymentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:text-white">
                        <SelectValue placeholder="Select Payment Type" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700 dark:text-white">
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      className="dark:bg-gray-700 dark:text-white"
                      type="number"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-gray-700 dark:text-white"
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-gray-700 dark:text-white"
                        placeholder="Location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <Button type="submit" className="w-full mt-4">
                Add Transaction
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default TransactionForm;
