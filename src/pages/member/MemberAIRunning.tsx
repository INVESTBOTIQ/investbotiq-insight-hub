import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import MemberPortal from "@/components/member/MemberPortal";

const MemberAIRunning = () => {
  return <MemberPortal initialTab="intelligence" />;
};

export default withRoleGuard(MemberAIRunning, ["member"]);
