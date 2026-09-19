import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import AdminPortal from "@/components/admin/AdminPortal";

const AdminSettings = () => {
  return <AdminPortal initialTab="settings" />;
};

export default withRoleGuard(AdminSettings, ["admin"]);
