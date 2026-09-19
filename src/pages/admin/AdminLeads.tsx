import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import AdminPortal from "@/components/admin/AdminPortal";

const AdminLeads = () => {
  return <AdminPortal initialTab="leads" />;
};

export default withRoleGuard(AdminLeads, ["admin"]);
