
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, Users, CheckCircle2 } from "lucide-react";
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { createReferralLinkFromCode, copyReferralLink, getReferralSummary } from '@/utils/referral-utils';

const ReferralBox = () => {
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string>("https://investbotiq.nl/?ref=demo");
  const [referralStats, setReferralStats] = useState({
    successful: 0,
    pending: 0,
    bonusEarned: 0
  });
  const { user } = useAuth();
  
  useEffect(() => {
    const loadReferralData = async () => {
      if (!user) return;
      
      const defaultCode = `INV${(user.id || 'MEM123').slice(0, 6).toUpperCase()}`;
      setReferralCode(defaultCode);
      setReferralLink(`https://investbotiq.nl/?ref=${defaultCode}`);

      const isConfigured = Boolean(
        import.meta.env.VITE_SUPABASE_URL &&
        !import.meta.env.VITE_SUPABASE_URL.includes("placeholder")
      );

      if (!isConfigured) {
        const summary = await getReferralSummary(user.id);
        if (summary) {
          setReferralStats({
            successful: summary.successful_referrals || 0,
            pending: summary.pending_referrals || 0,
            bonusEarned: summary.total_bonus || 0
          });
        }
        return;
      }

      try {
        const { data: existingCode } = await supabase
          .from("referrals")
          .select("referral_code")
          .eq("user_id", user.id)
          .is("referred_user_id", null)
          .maybeSingle();
        
        let code = defaultCode;
        if (existingCode?.referral_code) {
          code = existingCode.referral_code;
        } else {
          await supabase
            .from("referrals")
            .insert({
              user_id: user.id,
              referral_code: code
            });
        }
        
        setReferralCode(code);
        setReferralLink(`https://investbotiq.nl/?ref=${code}`);
        
        const summary = await getReferralSummary(user.id);
        if (summary) {
          setReferralStats({
            successful: summary.successful_referrals || 0,
            pending: summary.pending_referrals || 0,
            bonusEarned: summary.total_bonus || 0
          });
        }
      } catch {
        const summary = await getReferralSummary(user.id);
        if (summary) {
          setReferralStats({
            successful: summary.successful_referrals || 0,
            pending: summary.pending_referrals || 0,
            bonusEarned: summary.total_bonus || 0
          });
        }
      }
    };
    
    loadReferralData();
  }, [user]);
  
  const handleCopyLink = () => {
    copyReferralLink(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  
  return (
    <Card className="relative overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none rounded-bl-full" />
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2.5 text-lg font-semibold text-slate-900 dark:text-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
            Referral Programma
          </CardTitle>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            €100 bonus per lid
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
          <div className="flex-1 space-y-3">
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Nodig kennissen of relaties uit voor Invest Bot IQ. Zodra een nieuwe gebruiker start, ontvangt u €100 extra maandelijkse cashflow bonus.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <div className="relative flex-1">
                <Input 
                  value={referralLink} 
                  readOnly
                  className="pr-10 truncate bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-mono text-xs"
                />
                {copied && (
                  <div className="absolute top-0 right-0 bottom-0 flex items-center pr-3 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                )}
              </div>
              <Button 
                onClick={handleCopyLink} 
                className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition-all"
                variant="default"
              >
                <Copy className="mr-2 h-4 w-4" />
                {copied ? "Gekopieerd!" : "Kopieer referral link"}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 rounded-xl p-5 text-center min-w-[150px] w-full lg:w-auto">
            <div>
              <div className="text-3xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">€100</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">per succesvolle referral</div>
            </div>
          </div>
        </div>
        
        {/* Metric indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20"></div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{referralStats.successful} succesvolle referrals</span>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-500/20"></div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{referralStats.pending} referral in behandeling</span>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 ring-2 ring-indigo-600/20"></div>
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">€{referralStats.bonusEarned} extra cashflow verdiend</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralBox;
