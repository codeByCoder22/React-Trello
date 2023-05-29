import React from "react";

interface HomeProps {
    useProductsHook?: () => {
        isLoading: boolean;
        error: boolean;
    };
}

export const Home = ({ useProductsHook }: HomeProps) => {
    return (
        <>
            <h1>Home</h1>
        </>
    );
};
