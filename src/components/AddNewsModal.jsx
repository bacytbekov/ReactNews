import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddNewsModal = ({ open, handleClose, handleSubmit }) => {
    const [form, setForm] = useState({
        title: '',
        subTitle: '',
        content: '',
        image: '',
    });

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = () => {
        handleSubmit(form);
        setForm({ title: '', subTitle: '', content: '', image: '' });
        handleClose();
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 500 },
        bgcolor: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)',
        p: 4,
        outline: 'none'
    };

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            color: '#f8fafc',
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

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" sx={{ color: '#e2e8f0', fontWeight: 600 }}>
                        Добавить новость
                    </Typography>
                    <IconButton onClick={handleClose} sx={{ color: '#94a3b8' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Stack spacing={3}>
                    <TextField
                        label="Заголовок"
                        name="title"
                        value={form.title}
                        onChange={onChange}
                        fullWidth
                        sx={inputStyles}
                        variant="outlined"
                    />
                    <TextField
                        label="Подзаголовок"
                        name="subTitle"
                        value={form.subTitle}
                        onChange={onChange}
                        fullWidth
                        sx={inputStyles}
                        variant="outlined"
                    />
                    <TextField
                        label="Содержимое"
                        name="content"
                        value={form.content}
                        onChange={onChange}
                        multiline
                        rows={4}
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
                            Выбрать файл
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setForm({
                                                ...form,
                                                image: reader.result // сохраняем base64
                                            });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </Button>

                        {form.image && (
                            <Box mt={2}>
                                <Typography sx={{ color: '#94a3b8', mb: 1 }}>Превью:</Typography>
                                <Box
                                    component="img"
                                    src={form.image}
                                    alt="preview"
                                    sx={{ width: '100%', maxHeight: 200, borderRadius: 2, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }}
                                />
                            </Box>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        onClick={onSubmit}
                        sx={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            color: 'white',
                            borderRadius: '8px',
                            py: 1.5,
                            fontWeight: 500,
                            textTransform: 'none',
                            fontSize: '1rem',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                            }
                        }}
                    >
                        Сохранить
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default AddNewsModal;