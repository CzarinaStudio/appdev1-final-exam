import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

    // Environment Variables (Correctly accessed)
    const SECRET = import.meta.env.VITE_APP_SECRET_PASSWORD;
    const API_URL = import.meta.env.VITE_APP_API_URL;
    
    useEffect(() => {
        // FIX 1 & 2: Use axios and the API_URL environment variable (limit=3 is standard for this mock data)
        axios.get(`${API_URL}/users?_limit=3`) 
            .then(response => {
                setUsers(response.data); // Axios data is in response.data
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                alert("Could not load users for login!");
            });
    }, [API_URL]);

    function handleLogin() {
        // Find user (case-insensitive username check)
        const foundUser = users.find(user => user.username.toLowerCase() === username.toLowerCase());

        if (!foundUser) {
            alert("Username not found!");
            return;
        }

        // Check password against the environment variable secret
        if (password !== SECRET) {
            alert("Incorrect password!");
            return;
        }

        // Store user in localStorage upon successful login
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        
        // FIX 3: Use useNavigate for redirection
        navigate("/todos");
    }

    return (
        // Apply the CSS class for styling
        <div className="login-container"> 
            <h2>Login</h2>
            {/* Added hint for testing */}
            <p className="login-hint">Try logging in with 'Bret' or 'Antonette'. Password is '{SECRET}'.</p>
            
            <input 
                type="text" 
                className="login-input"
                placeholder="Enter username (E.g., Bret)" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <br />
            <input 
                type="password" 
                className="login-input"
                placeholder="Enter password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <br />
            <button 
                onClick={handleLogin} 
                className="login-button" 
            >
                Login
            </button>
        </div>
    );
}

export default Login;