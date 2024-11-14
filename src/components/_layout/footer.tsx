import { Box, Typography } from "@mui/material";

export default function Footer({sidebarOpen}: {sidebarOpen: boolean}) {
    return (
        <Box
            component="footer"
            role="contentinfo"
            className={`bg-gray-200 p-4 text-center bottom-0 right-0 transition-all duration-300 ease-in-out ${sidebarOpen ? 'sm:ml-60' : 'sm:ml-16'
                }`}
        >
            <Typography variant="body2">
                © 2024 Nanosoft. All rights reserved.
            </Typography>
        </Box>
    )
}