import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import AdminPortal from "@/components/admin/AdminPortal";

const AdminNotifications = () => {
  return <AdminPortal initialTab="notifications" />;
};

export default withRoleGuard(AdminNotifications, ["admin"]);
