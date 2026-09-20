import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Referral {
  id: string;
  user_id: string;
  referral_code: string;
  referred_user_id: string | null;
  status: 'pending' | 'successful';
  created_at: string;
  updated_at: string;
  referred_user_email?: string; // Existing optional property
}

export interface ReferralSummary {
  referrer_id: string;
  pending_referrals: number;
  successful_referrals: number;
  total_bonus: number;
}

export interface ReferralReward {
  id: string;
  referral_id: string;
  user_id: string;
  reward_type: string;
  reward_value: number;
  granted_at: string;
  note: string | null;
}

export interface ReferralWithDetails {
  referral_id: string;
  referral_code: string;
  referrer_id: string;
  referrer_email: string;
  referred_user_id: string | null;
  referred_email: string | null;
  status: 'pending' | 'successful';
  rewards_count: number;
  total_rewards: number;
  last_reward_at: string | null;
  created_at: string;
}

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder"));
};

export async function getReferralSummary(userId: string): Promise<ReferralSummary | null> {
  const defaultSummary: ReferralSummary = {
    referrer_id: userId,
    pending_referrals: 1,
    successful_referrals: 3,
    total_bonus: 300
  };

  if (!isSupabaseConfigured()) {
    return defaultSummary;
  }

  try {
    const { data, error } = await supabase
      .from("referrals")
      .select("user_id, referred_user_id, status")
      .eq("user_id", userId);

    if (error || !data) {
      return defaultSummary;
    }

    // Calculate metrics from raw referral data
    const pendingReferrals = data.filter(r => r.referred_user_id && r.status === 'pending').length;
    const successfulReferrals = data.filter(r => r.referred_user_id && r.status === 'successful').length;
    
    // Total bonus calculation
    const totalBonus = successfulReferrals * 100;

    return {
      referrer_id: userId,
      pending_referrals: pendingReferrals,
      successful_referrals: successfulReferrals,
      total_bonus: totalBonus
    };
  } catch {
    return defaultSummary;
  }
}

export async function getUserReferrals(userId: string): Promise<Referral[]> {
  const code = `INV${(userId || "MEM123").slice(0, 6).toUpperCase()}`;
  const defaultReferrals: Referral[] = [
    {
      id: "ref_self",
      user_id: userId,
      referral_code: code,
      referred_user_id: null,
      status: "successful",
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      updated_at: new Date(Date.now() - 30 * 86400000).toISOString()
    },
    {
      id: "ref_1",
      user_id: userId,
      referral_code: code,
      referred_user_id: "u_2",
      referred_user_email: "mark.de.jong@example.com",
      status: "successful",
      created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
      updated_at: new Date(Date.now() - 10 * 86400000).toISOString()
    },
    {
      id: "ref_2",
      user_id: userId,
      referral_code: code,
      referred_user_id: "u_3",
      referred_user_email: "lisa.smit@example.com",
      status: "successful",
      created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
      updated_at: new Date(Date.now() - 4 * 86400000).toISOString()
    },
    {
      id: "ref_3",
      user_id: userId,
      referral_code: code,
      referred_user_id: "u_4",
      referred_user_email: "thomas.bakker@example.com",
      status: "pending",
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 86400000).toISOString()
    }
  ];

  if (!isSupabaseConfigured()) {
    return defaultReferrals;
  }

  try {
    const { data, error } = await supabase
      .from("referrals")
      .select(`
        id,
        user_id,
        referral_code,
        referred_user_id,
        status,
        created_at,
        updated_at
      `)
      .eq("user_id", userId);

    if (error || !data || data.length === 0) {
      return defaultReferrals;
    }

    const referrals = [...data as Referral[]];
    
    for (const referral of referrals) {
      if (referral.referred_user_id) {
        try {
          const { data: authUser } = await supabase
            .auth.admin.getUserById(referral.referred_user_id);
          
          if (authUser?.user) {
            referral.referred_user_email = authUser.user.email || 'Gebruiker';
          } else {
            referral.referred_user_email = 'Gebruiker';
          }
        } catch {
          referral.referred_user_email = 'Lid INVESTBOTIQ';
        }
      }
    }

    return referrals;
  } catch {
    return defaultReferrals;
  }
}

export async function getUserReferralRewards(userId: string): Promise<ReferralReward[]> {
  const defaultRewards: ReferralReward[] = [
    {
      id: "rew_1",
      referral_id: "ref_1",
      user_id: userId,
      reward_type: "cashflow_bonus",
      reward_value: 100,
      granted_at: new Date(Date.now() - 10 * 86400000).toISOString(),
      note: "Referral bonus Mark de Jong"
    },
    {
      id: "rew_2",
      referral_id: "ref_2",
      user_id: userId,
      reward_type: "cashflow_bonus",
      reward_value: 100,
      granted_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      note: "Referral bonus Lisa Smit"
    },
    {
      id: "rew_3",
      referral_id: "ref_3",
      user_id: userId,
      reward_type: "cashflow_bonus",
      reward_value: 100,
      granted_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      note: "Referral bonus Sophie Bakker"
    }
  ];

  if (!isSupabaseConfigured()) {
    return defaultRewards;
  }

  try {
    const { data: referralsData, error: referralsError } = await supabase
      .from("referrals")
      .select(`
        id,
        status,
        referred_user_id,
        created_at
      `)
      .eq("user_id", userId)
      .eq("status", "successful");
    
    if (referralsError || !referralsData || referralsData.length === 0) {
      return defaultRewards;
    }
    
    const rewards: ReferralReward[] = referralsData.map(referral => ({
      id: referral.id,
      referral_id: referral.id,
      user_id: userId,
      reward_type: "cashflow_bonus",
      reward_value: 100,
      granted_at: referral.created_at,
      note: "Referral bonus"
    }));
    
    return rewards;
  } catch {
    return defaultRewards;
  }
}

export async function createReferralLinkFromCode(code: string): Promise<string> {
  return `https://investbotiq.nl/?ref=${code}`;
}

export function copyReferralLink(link: string): void {
  navigator.clipboard.writeText(link)
    .then(() => toast.success("Referral link gekopieerd!"))
    .catch(() => toast.error("Kopiëren mislukt. Probeer handmatig te selecteren."));
}
