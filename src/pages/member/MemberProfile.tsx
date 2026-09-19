import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import MemberPortal from "@/components/member/MemberPortal";

const MemberProfile = () => {
  return <MemberPortal initialTab="profile" />;
};

export default withRoleGuard(MemberProfile, ["member"]);
