# 🌐 BuddyScript Frontend

This repository contains the frontend application for our service, built using the Next.js framework. It utilizes a modern stack centered around Next.js, Tailwind CSS, and TypeScript, and is designed to support a real-time service application.

## 🛠️ Tech Stack

* **Framework:** Next.js (React)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Form Handling:** `react-hook-form` (with `zod` for schema validation)
* **API/Auth:** `js-cookie`, `jwt-decode`
* **UI Icons:** `lucide-react`, `react-icons`
* **Notifications:** `sonner`

## 🚀 Local Setup

Follow these steps to set up and run the project on your local machine.

### Prerequisites

You must have Node.js and npm (or yarn/pnpm) installed on your system.

### 1. Clone the Repository


git clone https://github.com/mohammad-salim-23/AppifyTask-Frontend
cd service-frontend
2. Install Dependencies
Run the following command in the project's root directory:



npm install
# Or if using yarn: yarn install
3. Configure Environment Variables
Create a file named .env.local in the project root and add your necessary environment variables. An example based on your provided variables is below:

# .env.local

# API Configuration
NEXT_PUBLIC_BASE_API=http://localhost:5000/api 

# Cloudinary Configuration (Replace with actual values for image uploads)
NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL=[https://api.cloudinary.com/v1_1/](https://api.cloudinary.com/v1_1/)[cloud_name]/image/upload
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=[your_upload_preset]

4. Start the Local Development Server


npm run dev
Your application should now be running in development mode at http://localhost:3000.

🏗️ Production Build
To build your application for production:



npm run build