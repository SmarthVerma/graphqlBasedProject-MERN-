import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpSchema from "@/schemas/SignupSchema";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MovingBorder } from "@/components/MovingBorder";
import { Link } from "react-router-dom"; // Import Link if you're using React Router

function Signup() {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
    console.log("This is your data", data);
    // Handle signup logic here, like sending data to an API
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gradient-to-r from-black to-gray-950 p-8 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[rgba(156, 163, 175, 0.5)] max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Welcome to
          <p className="text-orange-400 inline text-3xl "> ExpenseMaster!</p>
        </h1>
        <MovingBorder>
          <p className="text-center p-2 text-gray-600 dark:text-gray-400">
            Take control of your finances with ExpenseMaster. Analyze your
            spending habits and save your expenses.
          </p>
        </MovingBorder>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" mt-2 border rounded-xl p-2"
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-gray-700 dark:text-white m-0"
                        placeholder="shadcn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-gray-700 dark:text-white"
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-gray-700 dark:text-white"
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-gray-700 dark:text-white"
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-xs mt-1">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-orange-400 underline">
                  Log in here
                </Link>
              </p>
            </div>

            <Button type="submit" className="w-full mt-4">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Signup;