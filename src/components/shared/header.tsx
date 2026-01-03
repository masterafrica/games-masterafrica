import { useAuth } from "@/lib/auth-context";

const Header = () => {
  const { user } = useAuth();

  const displayName = user?.username || "Guest";

  return <div>{displayName}</div>;
};

export default Header;
