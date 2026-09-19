import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import MemberPortal from "@/components/member/MemberPortal";

const MemberProgress = () => {
  return <MemberPortal initialTab="voortgang" />;
};

export default withRoleGuard(MemberProgress, ["member"]);
