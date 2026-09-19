import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import AdminPortal from "@/components/admin/AdminPortal";

const AdminReferrals = () => {
  return <AdminPortal initialTab="referrals" />;
};

export default withRoleGuard(AdminReferrals, ["admin"]);
