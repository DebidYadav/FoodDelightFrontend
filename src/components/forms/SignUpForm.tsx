import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpFormData } from '../../types';
import { addCustomer } from '../../services/apiService';
import { validateEmail, validatePassword, validateUsername } from '../../utils';
import { VALIDATION, ERROR_MESSAGES, ROUTES } from '../../constants';

const SignUpForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SignUpFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
    const [loading, setLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<SignUpFormData> = {};

        if (!formData.username.trim()) {
            newErrors.username = ERROR_MESSAGES.REQUIRED_FIELD;
        } else if (!validateUsername(formData.username)) {
            newErrors.username = 'Username must be between 3 and 50 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = ERROR_MESSAGES.REQUIRED_FIELD;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = ERROR_MESSAGES.INVALID_EMAIL;
        }

        if (!formData.password) {
            newErrors.password = ERROR_MESSAGES.REQUIRED_FIELD;
        } else if (!validatePassword(formData.password)) {
            newErrors.password = `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = ERROR_MESSAGES.REQUIRED_FIELD;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = ERROR_MESSAGES.PASSWORD_MISMATCH;
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
        if (errors[name as keyof SignUpFormData]) {
            setErrors({
                ...errors,
                [name]: undefined
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        
        try {
            const payload = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            };
            
            const response = await addCustomer(payload);
            
            if (response.success) {
                console.log('Registration successful');
                navigate(ROUTES.LOGIN);
            } else {
                setErrors({ email: response.message || ERROR_MESSAGES.REGISTRATION_FAILED });
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({ email: ERROR_MESSAGES.REGISTRATION_FAILED });
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
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: `1px solid ${errors.username ? '#dc3545' : '#ccc'}`,
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                        required
                    />
                    {errors.username && (
                        <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                            {errors.username}
                        </div>
                    )}
                </div>
                
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
                
                <div style={{ marginBottom: '15px' }}>
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
                
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: `1px solid ${errors.confirmPassword ? '#dc3545' : '#ccc'}`,
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                        required
                    />
                    {errors.confirmPassword && (
                        <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                            {errors.confirmPassword}
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
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;