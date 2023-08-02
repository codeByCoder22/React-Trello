import { useEffect, useState } from "react";
import axios, { AxiosInstance } from "axios";

export interface BoardInterface {
    id: string;
    title: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

const useAxiosEffect = (
    url: string,
    accessToken: string
): [BoardInterface[] | null, boolean, string] => {
    const [boards, setBoards] = useState<BoardInterface[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setLoading(true);

        const axiosInstance: AxiosInstance = axios.create({
            baseURL: "YOUR_API_BASE_URL", // Replace with your API base URL
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        axiosInstance
            .get<BoardInterface[]>(url)
            .then((response) => {
                setBoards(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Error fetching boards. Please try again later.");
                setLoading(false);
            });
    }, [url, accessToken]);

    return [boards, loading, error];
};

export default useAxiosEffect;
