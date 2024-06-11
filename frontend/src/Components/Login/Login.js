import React, { useState } from 'react';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';

function LoginForm({ onLogin, switchToSignup }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log('User logged in:', userCredential.user);
            onLogin(userCredential.user);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                />
            </div>
            <button type="submit">Login</button>
            <p className="redirect">
                Don't have an account? <span onClick={switchToSignup}>Sign up here</span>
            </p>
        </FormStyled>
    );
}

const FormStyled = styled.form`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 2rem;
    max-width: 400px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .form-control {
        display: flex;
        flex-direction: column;
        label {
            margin-bottom: 0.5rem;
            color: rgba(34, 34, 96, 0.9);
        }
        input {
            padding: 0.8rem;
            border-radius: 5px;
            border: 2px solid #fff;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        }
    }
    button {
        padding: 1rem;
        border-radius: 20px;
        border: none;
        background-color: var(--color-accent);
        color: white;
        font-weight: bold;
        cursor: pointer;
        &:hover {
            background-color: var(--color-green);
        }
    }
    .redirect {
        text-align: center;
        color: rgba(34, 34, 96, 0.9);
        span {
            color: var(--color-accent);
            cursor: pointer;
            text-decoration: underline;
            &:hover {
                color: var(--color-green);
            }
        }
    }
`;
export default LoginForm;
