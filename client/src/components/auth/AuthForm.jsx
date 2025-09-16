import React from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import { loginSchema, registerSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import apiClient from "@/lib/apiClient";

export default function AuthForm({ type }) {
  const schema = type === "login" ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const endPoint = type === "login" ? "/auth/login" : "/auth/register";
      const response = await apiClient.post(endPoint, data);
      console.log("Success:", response.data);

      localStorage.setItem("token", response.data.token);
      alert("Success! Logged in as " + response.data.user.name);
    } catch (error) {
      console.error("API Error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border border-gray-200">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-center text-gray-900">
            {type === "register" ? "Create Your Account" : "Welcome Back"}
          </CardTitle>
          <p className="text-sm text-gray-500 text-center">
            {type === "register"
              ? "Sign up to get started with your new account"
              : "Login to access your dashboard"}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field (only in register) */}
            {type === "register" && (
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="John Doe"
                  className={`${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
                    }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className={`${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className={`${errors.password
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
                  }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl text-base font-semibold"
            >
              {isSubmitting
                ? type === "login"
                  ? "Logging in..."
                  : "Registering..."
                : type === "login"
                  ? "Login"
                  : "Register"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-sm text-center flex justify-center">
          {type === "login" ? (
            <p>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Register
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
