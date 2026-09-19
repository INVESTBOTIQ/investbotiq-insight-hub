
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

const BrandLogo = () => {
  const { userRole } = useAuth();
  const homePath = userRole === "admin" ? "/admin" : "/member/dashboard";

  return (
    <Link to={homePath} className="flex items-center gap-2">
      <img 
        src="/assets/5f5d8ba0-a589-457a-9989-8dc915655c00.png" 
        alt="Invest Bot IQ Logo" 
        className="h-8 w-auto hidden md:block"
      />
      <img 
        src="/assets/d0eeddae-6648-46cf-b4a4-30ede87c6dc6.png" 
        alt="Invest Bot IQ Icon" 
        className="h-10 w-auto"
      />
    </Link>
  );
};

export default BrandLogo;
