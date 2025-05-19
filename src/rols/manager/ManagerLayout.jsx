import React from 'react';
import { Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material';

function ManagerLayout() {
    const styles = {
        root: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: '#121212',
        },
        appBar: {
            backgroundColor: '#1e1e1e',
            borderBottom: '1px solid #2d2d2d',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        },
        title: {
            flexGrow: 1,
            fontWeight: 600,
            letterSpacing: '0.5px',
        },
        content: {
            flexGrow: 1,
            padding: '24px 0',
            backgroundColor: '#121212',
        },
        container: {
            padding: '0 24px',
        },
    };

    return (
        <Box sx={styles.root}>
            <CssBaseline />

            {/* Шапка */}
            <AppBar position="static" sx={styles.appBar}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={styles.title}>
                        Менеджерская панель
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Основное содержимое */}
            <Box component="main" sx={styles.content}>
                <Container maxWidth="xl" sx={styles.container}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
}

export default ManagerLayout;