import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import AdminPortal from "@/components/admin/AdminPortal";

const AdminDashboard = () => {
  return <AdminPortal initialTab="dashboard" />;
};

export default withRoleGuard(AdminDashboard, ["admin"]);
