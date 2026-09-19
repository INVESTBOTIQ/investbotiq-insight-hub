
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";

const RegisterSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-[#eef2ff] to-indigo-100 p-4 relative overflow-hidden">
      {/* Brand logo top */}
      <div className="mb-6 relative z-10">
        <BrandLogo to="/" />
      </div>
      {/* Grote orb rechtsboven */}
      <motion.div 
        className="absolute -top-24 -right-24 w-[30rem] h-[30rem] bg-indigo-200 rounded-full opacity-20 blur-3xl"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.18 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {/* Kleine orb linksonder */}
      <motion.div
        className="absolute bottom-0 left-0 w-44 h-44 bg-pink-200 rounded-full opacity-20 blur-2xl"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.16 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
      />
      <Card className="w-full max-w-md shadow-2xl relative z-10 animate-fade-in">
        <CardHeader>
          <div className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-indigo-400 to-pink-300 rounded-full p-3 shadow-lg"
            >
              {/* Check icoon */}
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" fill="#eef2ff" />
                <path d="M7 13l3 3 7-7" stroke="#6366f1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <CardTitle className="text-2xl text-center text-gray-800 mt-2">
              Bedankt voor uw aanmelding!
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.p 
            className="text-center text-gray-600 text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="font-semibold text-indigo-700">De IQ Bot</span> bekijkt uw aanvraag.<br/>
            U ontvangt binnen <span className="font-semibold text-indigo-700">48 uur</span> bericht via e-mail.<br/>
            Wij nemen zo spoedig mogelijk contact met u op.
          </motion.p>
          <Button asChild className="w-full hover:bg-indigo-600 transition-all shadow-md text-base py-6">
            <Link to="/">Terug naar home</Link>
          </Button>
        </CardContent>
      </Card>
      {/* Fade-in animatie keyframes */}
      <style>{`
        .animate-fade-in {
          animation: fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) both;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default RegisterSuccess;
