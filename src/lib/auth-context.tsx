import type { User } from "./graphql/types";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (user:Record<string,any>) => void;
  isAuthenticated: boolean;
  isAuthenticatedAndVerified: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser_] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const updateUser = (data:Record<string,any>)=>{
    setUser_((state:any)=>{
      let data_ = {...(state||{}),...(data||{})}
        localStorage.setItem("user",JSON.stringify(data_))
      return data_
    })
  }
  const setUser = (data:User|null)=>{
    setUser_(data as any)
    if(data){

      localStorage.setItem("user",JSON.stringify(data))
    }
  }

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const savedUser = localStorage.getItem("user");

    if (accessToken && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    setIsLoading(false);
  }, []);

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = !!user && !!Cookies.get("accessToken") ;
  const isAuthenticatedAndVerified = !!(isAuthenticated && user.EmailisVerified && user.setup) ;

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, isLoading, logout ,isAuthenticatedAndVerified,updateUser}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
