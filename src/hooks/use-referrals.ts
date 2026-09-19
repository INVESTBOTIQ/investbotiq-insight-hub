
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Referral,
  ReferralReward,
  ReferralSummary,
  ReferralWithDetails,
  getUserReferrals,
  getUserReferralRewards,
  getReferralSummary
} from "@/utils/referral-utils";

export function useUserReferrals(userId: string | undefined) {
  return useQuery({
    queryKey: ["userReferrals", userId],
    queryFn: async (): Promise<Referral[]> => {
      if (!userId) return [];
      return getUserReferrals(userId);
    },
    enabled: !!userId
  });
}

export function useUserReferralRewards(userId: string | undefined) {
  return useQuery({
    queryKey: ["userReferralRewards", userId],
    queryFn: async (): Promise<ReferralReward[]> => {
      if (!userId) return [];
      return getUserReferralRewards(userId);
    },
    enabled: !!userId
  });
}

export function useReferralSummary(userId: string | undefined) {
  return useQuery({
    queryKey: ["referralSummary", userId],
    queryFn: async (): Promise<ReferralSummary | null> => {
      if (!userId) return null;
      const summary = await getReferralSummary(userId);
      
      if (!summary) {
        return {
          referrer_id: userId,
          pending_referrals: 0,
          successful_referrals: 0,
          total_bonus: 0
        };
      }
      
      return summary;
    },
    enabled: !!userId
  });
}

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder"));
};

const fallbackAdminReferrals: ReferralWithDetails[] = [
  {
    referral_id: "ref_admin_1",
    referral_code: "INV8829",
    referrer_id: "u1",
    referrer_email: "jan.jansen@example.com",
    referred_user_id: "u2",
    referred_email: "sophie.bakker@example.com",
    status: "successful",
    rewards_count: 1,
    total_rewards: 100,
    last_reward_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    referral_id: "ref_admin_2",
    referral_code: "INV4412",
    referrer_id: "u3",
    referrer_email: "emma.visser@example.com",
    referred_user_id: "u4",
    referred_email: "lucas.dewit@example.com",
    status: "successful",
    rewards_count: 1,
    total_rewards: 100,
    last_reward_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    referral_id: "ref_admin_3",
    referral_code: "INV9011",
    referrer_id: "u5",
    referrer_email: "thomas.meijer@example.com",
    referred_user_id: "u6",
    referred_email: "sanne.koster@example.com",
    status: "pending",
    rewards_count: 0,
    total_rewards: 0,
    last_reward_at: null,
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  }
];

export function useAdminReferrals() {
  return useQuery({
    queryKey: ["adminReferrals"],
    queryFn: async (): Promise<ReferralWithDetails[]> => {
      if (!isSupabaseConfigured()) {
        return fallbackAdminReferrals;
      }

      try {
        const { data, error } = await supabase
          .from("referrals")
          .select(`
            id,
            referral_code,
            user_id,
            referred_user_id,
            status,
            created_at
          `)
          .order('created_at', { ascending: false });
        
        if (error || !data || data.length === 0) {
          return fallbackAdminReferrals;
        }
        
        const transformedData: ReferralWithDetails[] = [];
        
        for (const ref of data) {
          let referrerEmail = 'Gebruiker';
          try {
            const { data: referrerData } = await supabase
              .auth.admin.getUserById(ref.user_id);
            
            if (referrerData?.user?.email) {
              referrerEmail = referrerData.user.email;
            }
          } catch {
            referrerEmail = 'Gebruiker';
          }
          
          let referredEmail = null;
          if (ref.referred_user_id) {
            try {
              const { data: referredData } = await supabase
                .auth.admin.getUserById(ref.referred_user_id);
              
              if (referredData?.user?.email) {
                referredEmail = referredData.user.email;
              }
            } catch {
              referredEmail = 'Aangemeld lid';
            }
          }
          
          const rewardsCount = ref.status === 'successful' ? 1 : 0;
          const totalRewards = ref.status === 'successful' ? 100 : 0;
          
          transformedData.push({
            referral_id: ref.id,
            referral_code: ref.referral_code,
            referrer_id: ref.user_id,
            referrer_email: referrerEmail,
            referred_user_id: ref.referred_user_id,
            referred_email: referredEmail,
            status: ref.status as 'pending' | 'successful',
            rewards_count: rewardsCount,
            total_rewards: totalRewards,
            last_reward_at: ref.status === 'successful' ? ref.created_at : null,
            created_at: ref.created_at
          });
        }
        
        return transformedData;
      } catch {
        return fallbackAdminReferrals;
      }
    }
  });
}
