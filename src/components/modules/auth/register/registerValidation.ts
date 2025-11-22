import z from "zod";

export const registrationSchema = z.object({
    firstName: z.string({ message: "First Name is required" })
    .min(2,"Name must be at least 2 characters long"),

    lastName: z.string({ message: "Last Name is required" })
    .min(2,"Name must be at least 2 characters long"),

    email: z.string({message:"Email is required"},)
    .email("Invalid email address"),

    password: z.string()
    .min(6,"Password must be at least 6 characters long"),

    confirmPassword: z.string({
        message: "Please confirm your password"
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})