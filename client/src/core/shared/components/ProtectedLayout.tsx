/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { SessionStorage, SessionStorageKeys } from "../utils/session-storage";

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const userData = SessionStorage.getDataByKey(SessionStorageKeys.userData);
    if (!userData?.access_token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedLayout;
