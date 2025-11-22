"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "./registerValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/src/services/AuthService";
import { toast } from "sonner";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import NLButton from "@/src/components/ui/core/button/NlButton";
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
                    <Link href={"/"}>
                    <button className="flex items-center gap-2 cursor-pointer mb-5">
                     <FaArrowLeftLong/> Back to Home</button>
                    </Link>
                    <div>
                        <h2>Hi, Get Started Now 👋</h2>
                        <p>Enter details to create your account</p>
                    </div>
                    <Form  {...form}>
                       <form 
                       onSubmit={form.handleSubmit(onSubmit)}>
                        <div>
                            <label className="text-sm">Full Name</label>
                            <FormField
                            control={form.control}
                            name="firstName"
                            render={({field})=>(
                           <FormItem>
                             <FormLabel/>
                               <Input {...field} value = {field.value||""}/>
                               <FormMessage/>
                           </FormItem>
                            )}
                            />
                        </div>
                          <div>
                            <label className="text-sm">Full Name</label>
                            <FormField
                            control={form.control}
                            name="lastName"
                            render={({field})=>(
                           <FormItem>
                             <FormLabel/>
                               <Input {...field} value = {field.value||""}/>
                               <FormMessage/>
                           </FormItem>
                            )}
                            />
                        </div>
                               <div>
                <label className="text-sm">Email</label>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <Input {...field} value={field.value || ""} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
                            <div>
                <label className="text-sm">Password</label>
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
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
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
               {/* confirm password field     */}
               <div>
                <label className="text-sm">Repeat Password</label>
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
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
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
                <div>
                    <NLButton 
                  variant="primary"
                  className="w-full bg-black"
                  disabled={!!confirmPassword && password !== confirmPassword}
                  type="submit"
                    >
                  {form.formState.isSubmitting ? "Registering..." : "Register"}
                    </NLButton>
                     <p className="text-center text-sm mt-4">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary-500 font-semibold "
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