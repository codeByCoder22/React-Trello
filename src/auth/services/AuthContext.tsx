import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    FC,
    PropsWithChildren,
} from "react";
import { getCurrentUser } from "./authService";

interface AuthContextType {
    currentUser: string | null;
    setCurrentUser: (user: string | null) => void;
    isLogged: boolean;
    setIsLogged: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: FC<
    PropsWithChildren<React.HTMLAttributes<HTMLElement>>
> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async (): Promise<void> => {
            try {
                const response = await getCurrentUser();
                setCurrentUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    const authContextValue: AuthContextType = {
        currentUser,
        setCurrentUser,
        isLogged,
        setIsLogged,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
