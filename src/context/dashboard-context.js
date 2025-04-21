"use client";

import { getUser } from "@/actions/auth";
import { useClerk } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const InitialValues = {
  user: undefined,
  handleLogout: () => undefined,
  subscription: undefined,
  domains: undefined,
  refreshDashboard: () => {},
};

const dashboardContext = createContext(InitialValues);

const { Provider } = dashboardContext;

const DashboardProvider = ({ children }) => {
  const [data, setData] = useState();

  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
    redirect("/");
  };

  const fetchData = async () => {
    const userData = await getUser();

    if (userData) {
      setData(userData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { domains, subscription, ...user } = data || {};

  const values = {
    user,
    domains,
    subscription,
    handleLogout,
    refreshDashboard: fetchData,
  };

  return <Provider value={values}>{children}</Provider>;
};

export default DashboardProvider;

export const useDashboardContext = () => {
  const state = useContext(dashboardContext);

  return state;
};
