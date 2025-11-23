"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import NLButton from "@/src/components/ui/core/button/NlButton";
import z from "zod";
import Image from "next/image";
import logo from "../../../../app/assets/images/logo.svg";
import { loginUser } from "@/src/services/AuthService";


const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message || "Login successful");

        router.push("/");
      } else {
        toast.error(res?.message || "Invalid credentials");
      }
    } catch (error: any) {
      toast.error(error?.message || "Login failed");
    }
  };

  return (
    <div>
      <div>
        {/* TOP HEADER */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <Image
              src={logo}
              alt="Company Logo"
              width={120}
              height={40}
              className="w-auto h-auto max-w-[120px]"
              priority
            />
          </div>

          <h2 className="text-xl text-gray-900 mb-1 font-semibold">Welcome Back 👋</h2>
          <p className="text-gray-600 mb-0 text-2xl font-bold">Login to your account</p>
        </div>

        <Link href={"/"}>
          <button className="flex items-center gap-2 cursor-pointer mb-5 text-gray-500 hover:text-[#0d6efd] transition-colors">
            <FaArrowLeftLong /> Back to Home
          </button>
        </Link>

        {/* FORM */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="focus:border-[#0d6efd] rounded"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        value={field.value || ""}
                        className="pr-10 focus:border-[#0d6efd] rounded"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#0d6efd]"
                      >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="rememberMe"
                
                className="cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-gray-700 cursor-pointer">
                Remember Me
              </label>
            </div>

            {/* Button + Link */}
            <div className="pt-4">
              <NLButton
                variant="primary"
                className="w-full bg-[#0d6efd] hover:bg-blue-700 text-white  text-xl font-bold rounded-lg transition-colors"
                type="submit"
              >
                {form.formState.isSubmitting ? "Logging in..." : "Login Now"}
              </NLButton>

              <p className="text-center text-sm mt-4 text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-[#0d6efd] font-semibold hover:text-blue-700 transition-colors"
                >
                  Create New Account
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
