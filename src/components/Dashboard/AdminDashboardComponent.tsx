"use client";
import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import DataStatsOne from "./DataStats/DataStats";
import ChartOne from "../Charts/ChartOne";


const AdminDashboardComponent: React.FC = () => {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {

  }, [cookies]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <DataStatsOne />
          <div className="mt-4">
            <ChartOne />
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default AdminDashboardComponent;
