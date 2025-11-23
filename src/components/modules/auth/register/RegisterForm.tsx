"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "./registerValidation";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import NLButton from "@/src/components/ui/core/button/NlButton";
import Image from "next/image";
import logo from "../../../../app/assets/images/logo.svg"
import { registerUser } from "@/src/services/AuthService";

const RegisterForm = ()=>{
    const router = useRouter();
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(registrationSchema)
    });
    const password = form.watch("password");
    const confirmPassword = form.watch("confirmPassword");

    const onSubmit :SubmitHandler<FieldValues> = async(data)=>{
        try{
         const res = await registerUser(data);
         console.log("Registration response:",res);
         if(res?.success){
            toast.success(res?.message || "Registration successful");
            router.push("/login")
         }else{
          toast.error(res?.message || "Registration failed");
         }
        }catch(error:any){
            console.log("Registration error:",error);
            toast.error(error?.message || "Registration failed");
        }
    };
    

    return(
        <div>
            <div>
                <div>
                    
                    <div className="text-center mb-6"> {/* Added bottom margin */}
                       
                        {/* LOGO*/}
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
                        
                        <h2 className="text-xl text-gray-900 mb-1 font-semibold">
                             Get Started Now 👋
                        </h2> 
                        <p className="text-gray-600 mb-0 text-3xl font-bold">
                          Registration
                        </p>
                    </div>
                    
                   
                    <Link href={"/"}>
                        <button className="flex items-center gap-2 cursor-pointer mb-5 text-gray-500 hover:text-[#0d6efd] transition-colors cursor-pointer">
                            <FaArrowLeftLong/> Back to Home
                        </button>
                    </Link>

                    <Form  {...form}>
                       <form 
                       onSubmit={form.handleSubmit(onSubmit)}
                       className="space-y-4"
                       >
                        {/* First Name Field */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <FormField
                            control={form.control}
                            name="firstName"
                            render={({field})=>(
                           <FormItem>
                             <FormLabel/>
                               <Input {...field} value = {field.value||""} className="focus:border-[#0d6efd] rounded" />
                               <FormMessage/>
                           </FormItem>
                            )}
                            />
                        </div>
                        {/* Last Name Field */}
                          <div>
                            <label className="text-sm font-medium text-gray-700">Last Name</label>
                            <FormField
                            control={form.control}
                            name="lastName"
                            render={({field})=>(
                           <FormItem>
                             <FormLabel/>
                               <Input {...field} value = {field.value||""} className="focus:border-[#0d6efd] rounded" />
                               <FormMessage/>
                           </FormItem>
                            )}
                            />
                        </div>
                        {/* Email Field */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel />
                                <Input {...field} value={field.value || ""} className="focus:border-[#0d6efd] rounded" />
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        {/* Password Field */}
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
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#0d6efd] transition-colors"
                                    >
                                    {showPassword ? (
                                        <Eye size={18} />
                                    ) : (
                                        <EyeOff size={18} />
                                    )}
                                    </button>
                                </div>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        {/* Confirm Password Field */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Repeat Password</label>
                            <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel />
                                <div className="relative">
                                    <Input
                                    {...field}
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={field.value || ""}
                                    className="pr-10 focus:border-[#0d6efd] rounded"
                                    />
                                    <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#0d6efd] transition-colors"
                                    >
                                    {showConfirmPassword ? (
                                        <Eye size={18} />
                                    ) : (
                                        <EyeOff size={18} />
                                    )}
                                    </button>
                                </div>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>

                        {/* Register Button and Link */}
                        <div className="pt-4">
                            <NLButton 
                                variant="primary"
                                className="w-full bg-[#0d6efd] hover:bg-blue-700 text-white transition-colors rounded-lg" // Changed hover color slightly
                                disabled={!!confirmPassword && password !== confirmPassword}
                                type="submit"
                            >
                                {form.formState.isSubmitting ? "Registering..." : "Register Now"}
                            </NLButton>
                            <p className="text-center text-sm mt-4 text-gray-600">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-[#0d6efd] font-semibold hover:text-blue-700 transition-colors" 
                                >
                                    Login Now
                                </Link>
                            </p>
                        </div>

                       </form>
                    </Form>
                </div>
            </div>
        </div>
    )
} ;
export default RegisterForm;