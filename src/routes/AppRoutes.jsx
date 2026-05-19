import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import Sales from "../pages/Sales";
import Clients from "../pages/Clients";
import Warehouse from "../pages/Warehouse";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      <Route
        path="/inventory"
        element={
          <MainLayout>
            <Inventory />
          </MainLayout>
        }
      />

      <Route
        path="/sales"
        element={
          <MainLayout>
            <Sales />
          </MainLayout>
        }
      />

      <Route
        path="/clients"
        element={
          <MainLayout>
            <Clients />
          </MainLayout>
        }
      />

      <Route
        path="/warehouse"
        element={
          <MainLayout>
            <Warehouse />
          </MainLayout>
        }
      />

      <Route
        path="/reports"
        element={
          <MainLayout>
            <Reports />
          </MainLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <MainLayout>
            <Settings />
          </MainLayout>
        }
      />

    </Routes>
  );
}