
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MultiStepForm } from "@/components/registration/MultiStepForm";
import { Link } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";
import { ArrowLeft } from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0d0d21] to-slate-950 text-white py-10 px-4 relative overflow-hidden flex flex-col justify-center items-center">
      {/* Ambient glows */}
      <motion.div 
        className="absolute -top-20 -right-20 w-96 h-96 bg-purple-600/20 rounded-full opacity-30 blur-3xl pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full opacity-30 blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-6 flex justify-center relative z-10">
        <BrandLogo variant="dark" size="lg" to="/" />
      </div>
      
      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/30 via-slate-800 to-slate-800 shadow-2xl">
          <Card className="shadow-none border-0 bg-slate-900/90 backdrop-blur-xl text-white rounded-[23px]">
            <CardHeader className="border-b border-slate-800 pb-4">
              <CardTitle className="text-2xl text-center font-extrabold text-white">
                Aanmelden bij INVESTBOTIQ
              </CardTitle>
              <p className="text-center text-xs text-slate-400">
                Start binnen enkele minuten met geautomatiseerde AI cashflows
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <MultiStepForm />
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-4">
          <Link to="/auth" className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Al een account? Direct inloggen</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
