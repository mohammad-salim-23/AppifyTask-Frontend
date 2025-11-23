import RegisterForm from "@/src/components/modules/auth/register/RegisterForm";
import Image from "next/image";

import speedBg from "../assets/images/registration.png"; 

const RegisterPage = () => {
  return (
    
    <div className="min-h-screen bg-gray-200 flex flex-col"> 
    
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen">
       {/* Left side */}
        <div className="relative flex items-center justify-center p-6 lg:p-12"> 
          <div className="relative w-full max-w-sm lg:max-w-xl lg:max-h-[700px] aspect-[4/3]"> {/* Increased max-w-sm to max-w-xl */}
            <Image
              src={speedBg}
              alt="Registration Background"
              fill
              className="object-contain w-full h-full" 
              priority 
            />
          </div>
        </div>

       {/* right side */}
        <div className="flex items-center justify-center p-6 lg:p-12 bg-white"> 
          
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl"> 
            <RegisterForm />
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;