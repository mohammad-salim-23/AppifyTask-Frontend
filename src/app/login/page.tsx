
import Image from "next/image";

import image from "../assets/images/login.png"
import LoginForm from "@/src/components/modules/auth/login/LoginForm";

const LoginPage = () => {
  return (
    
    <div className="min-h-screen bg-gray-200 flex flex-col"> 
    
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen">
       {/* Left side */}
        <div className="relative flex items-center justify-center p-6 lg:p-12"> 
          <div className="relative w-full max-w-sm lg:max-w-xl lg:max-h-[700px] aspect-[4/3]"> 
            <Image
              src={image}
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
            <LoginForm/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;