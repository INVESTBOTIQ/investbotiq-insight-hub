import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import AdminPortal from "@/components/admin/AdminPortal";

const AdminFlowlutas = () => {
  return <AdminPortal initialTab="flowlutas" />;
};

export default withRoleGuard(AdminFlowlutas, ["admin"]);
