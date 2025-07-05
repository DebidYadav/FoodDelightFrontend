import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginFormData } from '../../types';
import { loginCustomer } from '../../services/apiService';
import { validateEmail } from '../../utils';
import { ERROR_MESSAGES, ROUTES } from '../../constants';

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});
    const [loading, setLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<LoginFormData> = {};

        if (!formData.email.trim()) {
            newErrors.email = ERROR_MESSAGES.REQUIRED_FIELD;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = ERROR_MESSAGES.INVALID_EMAIL;
        }

        if (!formData.password) {
            newErrors.password = ERROR_MESSAGES.REQUIRED_FIELD;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user starts typing
        if (errors[name as keyof LoginFormData]) {
            setErrors({
                ...errors,
                [name]: undefined
            });
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        
        try {
            const response = await loginCustomer(formData);
            
            if (response.success) {
                console.log('Login successful');
                navigate(ROUTES.HOME);
            } else {
                setErrors({ email: response.message || ERROR_MESSAGES.INVALID_CREDENTIALS });
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ email: ERROR_MESSAGES.INVALID_CREDENTIALS });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            maxWidth: '400px', 
            margin: '50px auto', 
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#fff'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: `1px solid ${errors.email ? '#dc3545' : '#ccc'}`,
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                        required
                    />
                    {errors.email && (
                        <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                            {errors.email}
                        </div>
                    )}
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: `1px solid ${errors.password ? '#dc3545' : '#ccc'}`,
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                        required
                    />
                    {errors.password && (
                        <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                            {errors.password}
                        </div>
                    )}
                </div>
                
                <button 
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;