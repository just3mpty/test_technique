"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export const themeOptions = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#212529",
        },
        secondary: {
            main: "#f1990b",
        },
        background: {
            default: "#ededed",
            paper: "#f8f9fa",
        },
    },
});

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={themeOptions}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
