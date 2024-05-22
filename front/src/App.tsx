import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import { ToastProvider } from "./context/ToastContext";
import Vehicle from "./pages/Vehicle";
import CustomerManagement from "./pages/Customers";
import TrackingManagement from "./pages/TrackingManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/signin"
          element={
            <ToastProvider>
              <SignIn />
            </ToastProvider>
          }
        />
        <Route
          path="/"
          element={
            <ToastProvider>
              <SignIn />
            </ToastProvider>
          }
        />

        <Route
          path="/signup"
          element={
            <ToastProvider>
              <SignUp />
            </ToastProvider>
          }
        />
        <Route
          path="/veiculos"
          element={
            <ToastProvider>
              <Vehicle />
            </ToastProvider>
          }
        />
        <Route
          path="/clientes"
          element={
            <ToastProvider>
              <CustomerManagement />
            </ToastProvider>
          }
        />
        <Route
          path="/home"
          element={
            <ToastProvider>
              <TrackingManagement />
            </ToastProvider>
          }
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
