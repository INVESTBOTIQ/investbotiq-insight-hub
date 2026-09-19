import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import AdminPortal from "@/components/admin/AdminPortal";

const AdminCashflows = () => {
  return <AdminPortal initialTab="cashflows" />;
};

export default withRoleGuard(AdminCashflows, ["admin"]);
