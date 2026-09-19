import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import MemberPortal from "@/components/member/MemberPortal";

const MemberTasks = () => {
  return <MemberPortal initialTab="takenlijst" />;
};

export default withRoleGuard(MemberTasks, ["member"]);
