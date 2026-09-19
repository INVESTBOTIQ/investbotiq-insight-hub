
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";

const NotFound = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const getDashboardLink = () => {
    if (userRole === "admin") return "/admin";
    if (userRole === "member") return "/member/dashboard";
    return "/";
  };

  const dashboardLabel = userRole === "admin" 
    ? "Terug naar Admin Dashboard" 
    : userRole === "member" 
      ? "Terug naar Member Dashboard" 
      : "Terug naar Home";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="mb-6">
        <BrandLogo to="/" />
      </div>
      <Card className="max-w-md w-full">
        <CardContent className="pt-6 pb-0 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-3xl">404</span>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-xl md:text-2xl font-bold mb-2">Pagina niet gevonden</h1>
            <p className="text-muted-foreground">
              Deze pagina is momenteel niet beschikbaar of bestaat niet.
              {userRole && " De IQ Bot is eraan aan het werken."}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-32 md:h-48 relative my-8 opacity-50"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary/20 via-purple-500/20 to-secondary/20 animate-pulse"></div>
              <div className="w-16 h-16 rounded-full absolute bg-gradient-to-r from-primary/30 via-purple-500/30 to-secondary/30 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
            </div>
          </motion.div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 w-full sm:w-auto" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" /> Ga terug
          </Button>
          
          <Button 
            className="flex items-center gap-2 w-full sm:w-auto"
            asChild
          >
            <Link to={getDashboardLink()}>
              <Home className="h-4 w-4" /> {dashboardLabel}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFound;
