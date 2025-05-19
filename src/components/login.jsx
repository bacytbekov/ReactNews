import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Link,
    CircularProgress,
    IconButton,
    InputAdornment
} from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const submitLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                login,
                password
            });

            if (response.data.success) {
                response.data.data.role === 'manager'
                    ? navigate('/manager')
                    : navigate('/home');
            } else {
                setError('Неверные учетные данные');
            }
        } catch (e) {
            console.error('Login error', e);
            setError('Ошибка при входе. Пожалуйста, попробуйте снова.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2
        }}>
            <Paper elevation={0} sx={{
                width: '100%',
                maxWidth: 450,
                p: 4,
                borderRadius: '16px',
                background: 'rgba(15, 23, 42, 0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 4
                }}>
                    <Box sx={{
                        bgcolor: 'rgba(99, 102, 241, 0.2)',
                        width: 60,
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        mb: 2
                    }}>
                        <LockOutlinedIcon sx={{
                            fontSize: 30,
                            color: '#6366f1'
                        }} />
                    </Box>
                    <Typography component="h1" variant="h5" sx={{
                        color: '#e2e8f0',
                        fontWeight: 600,
                        letterSpacing: 0.5
                    }}>
                        Вход в систему
                    </Typography>
                </Box>

                <Box component="form" onSubmit={submitLogin} sx={{ mt: 2 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Логин"
                        autoComplete="username"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                color: '#e2e8f0',
                                '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#6366f1',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'rgba(226, 232, 240, 0.6)',
                            },
                            mb: 3
                        }}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Пароль"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        sx={{ color: 'rgba(226, 232, 240, 0.6)' }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                color: '#e2e8f0',
                                '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#6366f1',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'rgba(226, 232, 240, 0.6)',
                            },
                            mb: 2
                        }}
                    />

                    {error && (
                        <Typography sx={{
                            color: '#ef4444',
                            textAlign: 'center',
                            mt: 1,
                            mb: 2,
                            fontSize: '0.875rem'
                        }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
                        sx={{
                            mt: 2,
                            mb: 3,
                            py: 1.5,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '1rem',
                            textTransform: 'none',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                            },
                            '&:disabled': {
                                background: 'rgba(255, 255, 255, 0.1)',
                                color: 'rgba(255, 255, 255, 0.4)'
                            }
                        }}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : 'Войти'}
                    </Button>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 2
                    }}>
                        <Typography variant="body2" sx={{
                            color: 'rgba(226, 232, 240, 0.6)',
                            fontSize: '0.875rem'
                        }}>
                            Нет аккаунта?
                        </Typography>
                        <Link
                            href="/register"
                            variant="body2"
                            sx={{
                                ml: 1,
                                color: '#93c5fd',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                    color: '#6366f1'
                                }
                            }}
                        >
                            Зарегистрироваться
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;