
"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Image as PhotoIcon, Video, Calendar, FileText, Send, CheckCircle } from "lucide-react";
import { uploadImageToCloudinary } from "@/src/services/Cloudinary";
import { createPost } from "@/src/services/PostService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import profileImg from "../../../app/assets/images/txt_img.png"
const ActionIcon = ({ Icon, label }: { Icon: any; label: string }) => (
    <button
        type="button"
        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition p-2 rounded-lg"
    >
        <Icon className="h-5 w-5" />
        <span className="text-sm font-medium hidden sm:inline">{label}</span>
    </button>
);

interface CreatePostProps {
    currentUser: any; 
}

const CreatePost: React.FC<CreatePostProps> = ({ currentUser }) => {
    const [text, setText] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [visibility, setVisibility] = useState<"public" | "private">("public");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const imageInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setImageFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!text && !imageFile) {
            setError("Post cannot be empty.");
            return;
        }

        setIsLoading(true);
        let finalImageUrl: string | undefined;

        try {
            if (imageFile) {
                const uploadResult = await uploadImageToCloudinary(imageFile);
                if (!uploadResult?.success) throw new Error(uploadResult?.message);
                finalImageUrl = uploadResult.url;
            }

            const result = await createPost({
                text,
                image: finalImageUrl,
                visibility
            });
           console.log("post.....",result)
            if (!result?.success) throw new Error(result?.message);

            toast.success("Your post has been shared!");

            setText("");
            setImageFile(null);
            if (imageInputRef.current) imageInputRef.current.value = "";
            router.refresh();

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border space-y-4">
            <div className="flex space-x-4">
                <div className="relative h-12 w-12">
                    <Image
                        src={profileImg}
                        fill
                        className="rounded-full object-cover"
                        alt="avatar"
                    />
                </div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={`What's on your mind, ${currentUser?.firstName || "Buddy"}?`}
                    className="w-full p-3 bg-gray-50 rounded-lg focus:ring-0"
                />
            </div>

            {imageFile && (
                <div className="relative mt-4 p-2 border rounded-lg">
                    <Image
                        src={URL.createObjectURL(imageFile)}
                        alt="preview"
                        width={200}
                        height={200}
                        className="rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={() => setImageFile(null)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2"
                    >
                        ✕
                    </button>
                </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && (
                <div className="flex items-center p-3 bg-green-100 text-green-700 rounded-lg">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    {success}
                </div>
            )}

            <div className="border-t pt-4 flex items-center justify-between">
                <div className="flex space-x-4 items-center">
                    <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                    >
                        <PhotoIcon className="h-5 w-5" />
                        <span className="hidden sm:inline text-sm cursor-pointer">Photo</span>
                    </button>

                    <input
                        type="file"
                        ref={imageInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden cursor-pointer"
                    />

                    <ActionIcon Icon={Video} label="Video" />
                    <ActionIcon Icon={Calendar} label="Event" />
                    <ActionIcon Icon={FileText} label="Article" />

                    <select
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value as any)}
                        className="border rounded-lg p-1.5 cursor-pointer"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-6 py-2 rounded-lg bg-blue-400 hover:bg-blue-500 text-white cursor-pointer"
                >
                    {isLoading ? "Posting..." : <><Send className="h-5 w-5" /> Post</>}
                </button>
            </div>
        </form>
    );
};

export default CreatePost;
