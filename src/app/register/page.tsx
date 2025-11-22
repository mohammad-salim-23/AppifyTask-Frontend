import RegisterForm from "@/src/components/modules/auth/register/RegisterForm";
import Image from "next/image";
import homeImg from "../assets/Images/welcome.jpg";

const RegisterPage = () => {
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* LEFT SIDE IMAGE (Hidden on small screens) */}
        <div className="relative hidden lg:block">
          <Image
            src={homeImg}
            alt="Home"
            fill
            className="object-cover h-full w-full"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
