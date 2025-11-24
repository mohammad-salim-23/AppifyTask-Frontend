"use server";

export const uploadImageToCloudinary = async (image: File) => {
    try {   
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
        formData.append("folder", "rental-house-images");
        const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        return {
            success: true,
            url: data.secure_url,
            message: "Image uploaded successfully",
        }

    } catch (error) {
        console.error(error);
    }
};
