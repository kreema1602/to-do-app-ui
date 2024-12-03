import { useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data: any) => {
    setUser(data);
    navigate("/");
  };

  const logout = async () => {
    setUser(null);
    navigate("/login");
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
