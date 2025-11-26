import React from "react";
import PrivateRoute from "../components/PrivateRoute"; // ili "../PrivateRoute" ako je PrivateRoute u components/
import AdminMessages from "../pages/AdminMessages";

const AdminMessagesRoute: React.FC = () => {
  return <PrivateRoute Component={AdminMessages} />;
};

export default AdminMessagesRoute;
