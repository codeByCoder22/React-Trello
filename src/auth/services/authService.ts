import React from "react";
import axios, { AxiosResponse } from "axios";
import axiosInstance from "../../utils/axiosInstance";
/*
interface User {
    id: number;
    name: string;
    // Add any other properties of the User object
}

export const useGetCurrentUser = async () => {
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        const fetchUser = async (): Promise<void> => {
            try {
                const response: AxiosResponse<User> = await axios.get<User>(
                    "http://localhost:4001/api/user"
                );
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);
};
*/
export const getCurrentUser = async () => {
    try {
        const res = await axiosInstance.get("/api/user");
        return res.data;
    } catch (message) {
        return console.log(message);
    }
};
