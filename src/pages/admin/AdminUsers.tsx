import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import AdminPortal from "@/components/admin/AdminPortal";

const AdminUsers = () => {
  return <AdminPortal initialTab="users" />;
};

export default withRoleGuard(AdminUsers, ["admin"]);
