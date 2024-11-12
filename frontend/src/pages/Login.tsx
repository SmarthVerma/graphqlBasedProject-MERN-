import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginSchema from "@/schemas/LoginSchema"; // Ensure this path is correct
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
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.query";

function Login() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

const [login, { loading }] = useMutation(LOGIN, {
  refetchQueries: [GET_AUTHENTICATED_USER],
  update(cache, { data }) {
    if (data?.login) {
      // Read the data from the existing GET_AUTHENTICATED_USER query in the cache
      const existingUser = cache.readQuery({ query: GET_AUTHENTICATED_USER });
      console.log("Existing User", existingUser)
      // Write the updated user data to the cache
      cache.writeQuery({
        query: GET_AUTHENTICATED_USER,
        data: { authUser: data.login },
      });
    }
  },
});
  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    console.log("This is your data", data);

    try {
      await login({
        variables: {
          input: data,
        },
      });
      toast.success("Logged in successfully!");
    } catch (error: any) {
      console.log("Error in login", error);
      toast.error("Error " + error.message);
    }
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
            Log in to take control of your finances and analyze your spending
            habits.
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
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-gray-700 dark:text-white"
                        type="text"
                        placeholder="Username"
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
            </div>

            <div className="text-xs mt-1">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-orange-400/85 underline">
                  Sign up here
                </Link>
              </p>
            </div>
            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Login;
