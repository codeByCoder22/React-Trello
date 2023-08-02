import React, { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAuthContext } from "./AuthContext";

export const ProtectedRoute: FC<
    PropsWithChildren<React.HTMLAttributes<HTMLElement>>
> = ({ children }) => {
    const { currentUser } = useAuthContext();
    if (!currentUser) {
        return <Navigate to="/login" />;
        // return <Navigate to="/home" replace state={{ from: location }} />;
    }
    return <>{children}</>;
};
