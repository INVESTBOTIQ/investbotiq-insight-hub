import React from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import AdminPortal from "@/components/admin/AdminPortal";

const AdminTasks = () => {
  return <AdminPortal initialTab="tasks" />;
};

export default withRoleGuard(AdminTasks, ["admin"]);
