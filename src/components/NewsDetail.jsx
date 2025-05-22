import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Typography,
    Button,
    TextField,
    Stack,
    Paper,
    IconButton,
    CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function NewsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        title: '',
        subTitle: '',
        content: '',
        image: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState({url:null,type:false});

    const fetchNews = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/news/${id}`);
            setNews(response.data.data);
            setForm(response.data.data);
            if (response.data.data.image) {
                setImagePreview(response.data.data.image);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchNews();
    }, [id]);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setForm(prev => ({ ...prev, image: file }));
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview({url: reader.result,type: true});
        };
        reader.readAsDataURL(file);

    };

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('subTitle', form.subTitle);
            formData.append('content', form.content);
            if (form.image) {
                formData.append('image', form.image);
            }

            const response = await axios.post(`http://127.0.0.1:8000/api/news/${id}`, formData, {
                params: { _method: 'PUT' } // Laravel поймёт, что это PUT
                // Не указываем Content-Type вручную!
            });

            console.log(response);
            setNews(response.data.data);
            setEditMode(false);

        } catch (error) {
            console.error(error);
        } finally {
            fetchNews();
            setIsLoading(false);
        }
    };


    const handleDelete = async () => {
        if (!window.confirm('Вы уверены, что хотите удалить эту новость?')) return;

        setIsLoading(true);
        try {
            await axios.delete(`http://127.0.0.1:8000/api/news/${id}`);
            navigate('/manager');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            color: '#e2e8f0',
            '& fieldset': {
                borderColor: 'rgba(255,255,255,0.2)',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(255,255,255,0.3)',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#6366f1',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#94a3b8',
        },
        '& .MuiInputBase-input': {
            '&::placeholder': {
                color: '#64748b',
                opacity: 1,
            },
        },
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={60} thickness={4} sx={{ color: '#6366f1' }} />
            </Box>
        );
    }

    if (!news) return <Typography>Загрузка...</Typography>;

    return (
        <Box sx={{
            maxWidth: 800,
            margin: '40px auto',
            padding: { xs: '16px', sm: '24px' }
        }}>
            <Paper sx={{
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(12px)',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                p: 4
            }}>
                {!editMode ? (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <IconButton onClick={() => navigate(-1)} sx={{ color: '#94a3b8' }}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Box>
                                <IconButton
                                    onClick={() => setEditMode(true)}
                                    sx={{ color: '#6366f1', mr: 1 }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    onClick={handleDelete}
                                    sx={{ color: '#ef4444' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        <Typography variant="h4" sx={{
                            color: '#f8fafc',
                            fontWeight: 600,
                            mb: 2
                        }}>
                            {news.title}
                        </Typography>

                        <Typography variant="h6" sx={{
                            color: '#e2e8f0',
                            mb: 3
                        }}>
                            {news.subTitle}
                        </Typography>

                        <Typography variant="body1" sx={{
                            color: '#cbd5e1',
                            lineHeight: 1.6,
                            mb: 3
                        }}>
                            {news.content}
                        </Typography>

                        {news.image && (
                            <Box sx={{
                                mb: 3,
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                            }}>
                                <img
                                    src={`http://127.0.0.1:8000/storage/${news.image}`}
                                    alt={news.title}
                                    style={{
                                        maxWidth: '100%',
                                        display: 'block'
                                    }}
                                />
                            </Box>
                        )}
                    </>
                ) : (
                    <>
                        <Typography variant="h5" sx={{
                            color: '#f8fafc',
                            fontWeight: 600,
                            mb: 3
                        }}>
                            Редактировать новость
                        </Typography>

                        <Stack spacing={3} sx={{ mb: 4 }}>
                            <TextField
                                label="Заголовок"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                fullWidth
                                sx={inputStyles}
                                variant="outlined"
                            />

                            <TextField
                                label="Подзаголовок"
                                name="subTitle"
                                value={form.subTitle}
                                onChange={handleChange}
                                fullWidth
                                sx={inputStyles}
                                variant="outlined"
                            />

                            <TextField
                                label="Контент"
                                name="content"
                                multiline
                                rows={6}
                                value={form.content}
                                onChange={handleChange}
                                fullWidth
                                sx={inputStyles}
                                variant="outlined"
                            />

                            <Box>
                                <Typography sx={{ color: '#94a3b8', mb: 1 }}>Изображение</Typography>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    sx={{
                                        color: '#f8fafc',
                                        borderColor: 'rgba(255,255,255,0.2)',
                                        '&:hover': {
                                            borderColor: 'rgba(255,255,255,0.4)',
                                        }
                                    }}
                                >
                                    Загрузить изображение
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleImageChange}
                                    />
                                </Button>

                                {imagePreview && (
                                    <Box sx={{
                                        mb: 3,
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                                    }}>
                                        <Typography sx={{ color: '#94a3b8', mb: 1 }}>Превью:</Typography>
                                        <img
                                            src={imagePreview.type?imagePreview.url:`http://127.0.0.1:8000/storage/${news.image}`}
                                            alt={news.title}
                                            style={{
                                                maxWidth: '100%',
                                                display: 'block'
                                            }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                onClick={handleUpdate}
                                startIcon={<SaveIcon />}
                                sx={{
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                    color: 'white',
                                    borderRadius: '8px',
                                    px: 3,
                                    py: 1,
                                    fontWeight: 500,
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                                    }
                                }}
                            >
                                Сохранить
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={() => setEditMode(false)}
                                startIcon={<CancelIcon />}
                                sx={{
                                    color: '#94a3b8',
                                    borderColor: 'rgba(255,255,255,0.2)',
                                    borderRadius: '8px',
                                    px: 3,
                                    py: 1,
                                    '&:hover': {
                                        borderColor: 'rgba(255,255,255,0.3)',
                                        backgroundColor: 'rgba(255,255,255,0.05)'
                                    }
                                }}
                            >
                                Отмена
                            </Button>
                        </Stack>
                    </>
                )}
            </Paper>
        </Box>
    );
}

export default NewsDetail;