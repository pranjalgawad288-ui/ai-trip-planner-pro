import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import AIPlanner from "./pages/AIPlanner";
import BudgetCalculator from "./pages/BudgetCalculator";
import CreateTrip from "./pages/CreateTrip";
import EditTrip from "./pages/EditTrip";
import TripDetails from "./pages/TripDetails";
import SavedTrips from "./pages/SavedTrips";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/ai-planner" element={<ProtectedRoute><AIPlanner /></ProtectedRoute>} />
            <Route path="/budget-calculator" element={<ProtectedRoute><BudgetCalculator /></ProtectedRoute>} />
            <Route path="/trips/create" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
            <Route path="/trips/:id/edit" element={<ProtectedRoute><EditTrip /></ProtectedRoute>} />
            <Route path="/trips/:id" element={<ProtectedRoute><TripDetails /></ProtectedRoute>} />
            <Route path="/trips" element={<ProtectedRoute><SavedTrips /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer position="top-right" theme="colored" />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
