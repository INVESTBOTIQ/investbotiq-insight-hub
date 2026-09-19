import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import AdminPortal from "@/components/admin/AdminPortal";

const AdminProfile = () => {
  return <AdminPortal initialTab="profile" />;
};

export default withRoleGuard(AdminProfile, ["admin"]);
