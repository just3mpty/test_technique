"use client";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();

    const handleLogin = () => {
        const token = "mock-jwt-token";
        localStorage.setItem("token", token);
        router.push("/home");
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}>
            <Button variant="contained" color="secondary" onClick={handleLogin}>
                Login
            </Button>
        </Box>
    );
};

export default LoginPage;
