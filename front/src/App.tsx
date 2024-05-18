import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import { ToastProvider } from "./context/ToastContext";
import Vehicle from "./pages/vehicle";
import UserManagement from "./pages/Users";

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
          path="/vehicle"
          element={
            <ToastProvider>
              <Vehicle />
            </ToastProvider>
          }
        />
        <Route
          path="/users"
          element={
            <ToastProvider>
              <UserManagement />
            </ToastProvider>
          }
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
