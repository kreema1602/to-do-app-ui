import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import ProtectedRoute from "./routes/ProtectedRoute";

const App: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/main"
        element={
          <ProtectedRoute
            isAuthenticated={isLogin}
            redirectTo="/"
            element={<Main />}
          ></ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
