import { Outlet, Link } from "react-router-dom";
import logo from '../assets/images/logo_white.png'

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      <div className="hidden lg:flex flex-col items-center justify-center text-white px-10 relative bg-gradient-to-br from-teal-500 to-teal-600">
        
        <div className="w-200 h-48 flex items-center justify-center mb-8">
          <img src={logo} alt="MCKVF Logo" className="w-90" />
        </div>
        <h2 className="text-4xl !text-white/80 font-bold mb-4">
          Your Trusted Website
        </h2>
        <p className="text-center text-white/80 mb-6">
          Start your journey with us
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
