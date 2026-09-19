import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import MemberPortal from "@/components/member/MemberPortal";

const MemberDashboard = () => {
  return <MemberPortal initialTab="dashboard" />;
};

export default withRoleGuard(MemberDashboard, ["member"]);
