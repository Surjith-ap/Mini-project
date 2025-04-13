import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:3004/api/v1/login";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            localStorage.setItem("userDetails",JSON.stringify(res.user))
            navigate('/dashboard')
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <LoginContainer>
            <div className="login-card">
                <div className="branding">
                    <h2>PocketGuard</h2>
                    <p>Personal Finance Manager</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <h2>Welcome Back</h2>
                    <div className="input-group">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            name="email" 
                            value={data.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            value={data.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit">Sign In</button>
                    <p className="signup-link">
                        Don't have an account? <Link to="/signup">Create account</Link>
                    </p>
                </form>
            </div>
        </LoginContainer>
    );
};

const LoginContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${require('../../img/Firefly budget tracking system 71417.jpg')});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    
    .login-card {
        width: 400px;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        
        .branding {
            background: linear-gradient(120deg, #7551E9 0%, #4285F4 100%);
            padding: 20px;
            color: white;
            text-align: center;
            
            h2 {
                margin: 0;
                font-weight: 600;
                font-size: 28px;
            }
            
            p {
                margin: 5px 0 0;
                opacity: 0.9;
            }
        }
        
        form {
            padding: 30px;
            
            h2 {
                margin: 0 0 20px;
                color: #333;
                font-size: 24px;
                text-align: center;
            }
            
            .input-group {
                margin-bottom: 20px;
                
                input {
                    width: 100%;
                    padding: 15px;
                    border: 1px solid #e1e1e1;
                    border-radius: 10px;
                    font-size: 16px;
                    transition: border 0.3s ease;
                    outline: none;
                    
                    &:focus {
                        border-color: #7551E9;
                    }
                }
            }
            
            .error-message {
                color: #e74c3c;
                margin-bottom: 15px;
                font-size: 14px;
                text-align: center;
                padding: 10px;
                background-color: rgba(231, 76, 60, 0.1);
                border-radius: 10px;
            }
            
            button {
                width: 100%;
                padding: 15px;
                background: linear-gradient(120deg, #7551E9 0%, #4285F4 100%);
                border: none;
                border-radius: 10px;
                color: white;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.3s ease;
                
                &:hover {
                    transform: translateY(-2px);
                }
            }
            
            .signup-link {
                margin-top: 20px;
                text-align: center;
                color: #666;
                
                a {
                    color: #7551E9;
                    text-decoration: none;
                    font-weight: 600;
                    
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
    
    @media (max-width: 480px) {
        .login-card {
            width: 90%;
        }
    }
`;

export default LoginPage;