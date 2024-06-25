/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { SessionStorage, SessionStorageKeys } from "../utils/session-storage";
import { Role } from "../constants/enums";

interface ProtectedLayoutProps {
  children: ReactNode;
  allowedRoles: Role[];
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  children,
  allowedRoles,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = SessionStorage.getDataByKey(SessionStorageKeys.token);
    const userRole: Role = SessionStorage.getDataByKey(
      SessionStorageKeys.userData
    )?.role;

    if (!token) {
      router.push("/login");
    } else if (userRole && allowedRoles.includes(userRole)) {
      setIsAuthenticated(true);
    } else {
      router.push("/unauthorized"); // Redirect to an unauthorized page if the user role is not allowed
    }
  }, []);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedLayout;
