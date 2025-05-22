import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
    Typography,
    Button,
    Box,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AddNewsModal from "../../components/AddNewsModal.jsx";
import { useNavigate } from "react-router-dom";

function ManagerDashboard() {
    const [news, setNews] = useState({ 'data': [] });
    const api = 'http://127.0.0.1:8000/api/news';
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const fetchNews = async () => {
        try {
            const response = await axios.get(api);
            setNews(response.data);
            console.log(response.data);
        } catch (e) {
            console.error("Error fetching news:", e);
        }
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const handleAddNews = async (newsData) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/news', newsData);
            fetchNews();
        } catch (error) {
            console.error("Error adding news:", error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [api]);

    const styles = {
        root: {
            maxWidth: 1000,
            margin: '40px auto',
            padding: '0 24px'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px'
        },
        title: {
            fontWeight: 600,
            color: '#e2e8f0',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        },
        addButton: {
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            borderRadius: '8px',
            padding: '10px 20px',
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            '&:hover': {
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                boxShadow: '0 6px 8px rgba(0,0,0,0.3)'
            }
        },
        newsContainer: {
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(12px)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden'
        },
        newsItem: {
            '&:hover': {
                background: 'rgba(255,255,255,0.05)'
            }
        },
        newsContent: {
            '& .MuiListItemText-primary': {
                color: '#f8fafc',
                fontWeight: 500
            },
            '& .MuiListItemText-secondary': {
                color: '#94a3b8',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }
        },
        editButton: {
            color: '#94a3b8',
            '&:hover': {
                color: '#e2e8f0'
            }
        },
        emptyState: {
            padding: '40px',
            textAlign: 'center',
            background: 'rgba(15, 23, 42, 0.5)',
            borderRadius: '12px',
            border: '1px dashed rgba(255,255,255,0.2)',
            color: '#94a3b8'
        },
        divider: {
            backgroundColor: 'rgba(255,255,255,0.1)'
        }
    };

    return (
        <Box sx={styles.root}>
            {/* Header */}
            <Box sx={styles.header}>
                <Typography variant="h4" sx={styles.title}>
                    Управление новостями
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={styles.addButton}
                    onClick={handleOpenModal}
                >
                    Новая запись
                </Button>
            </Box>

            <AddNewsModal
                open={openModal}
                handleClose={handleClose}
                handleSubmit={handleAddNews}
            />

            {/* News List */}
            {news.data.length === 0 ? (
                <Paper sx={styles.emptyState}>
                    <Typography variant="body1">
                        Пока нет новостей. Добавьте первую запись.
                    </Typography>
                </Paper>
            ) : (
                <Paper sx={styles.newsContainer}>
                    <List disablePadding>
                        {news.data.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            onClick={() => navigate(`/manager/news/${item.id}`)}
                                            sx={styles.editButton}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    }
                                    sx={styles.newsItem}
                                >
                                    <ListItemButton
                                        onClick={() => navigate(`/manager/news/${item.id}`)}
                                        sx={{ py: '16px' }}
                                    >
                                        <ListItemText
                                            primary={item.title}
                                            secondary={
                                                item.content.length > 120
                                                    ? `${item.content.substring(0, 120)}...`
                                                    : item.content
                                            }
                                            sx={styles.newsContent}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                {index < news.data.length - 1 && <Divider sx={styles.divider} />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    );
}

export default ManagerDashboard;