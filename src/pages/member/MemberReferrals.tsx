import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import MemberPortal from "@/components/member/MemberPortal";

const MemberReferrals = () => {
  return <MemberPortal initialTab="referrals" />;
};

export default withRoleGuard(MemberReferrals, ["member"]);
