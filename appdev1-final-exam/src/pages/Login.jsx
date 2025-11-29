import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

    const SECRET = import.meta.env.VITE_APP_SECRET_PASSWORD;
    const API_URL = import.meta.env.VITE_APP_API_URL;
    
    useEffect(() => {
        axios.get(`${API_URL}/users?_limit=3`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                alert("Could not load users for login!");
            });
    }, [API_URL]);

    function handleLogin() {
        const foundUser = users.find(user => user.username.toLowerCase() === username.toLowerCase());

        if (!foundUser) {
            alert("Username not found!");
            return;
        }

        if (password !== SECRET) {
            alert("Incorrect password!");
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        navigate("/todos");
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Login</h2>
            <p>Try logging in with 'Bret' or 'Antonette'. Password is '{SECRET}'.</p>
            <input 
                type="text" 
                placeholder="Enter username (E.g., Bret)" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <br />
            <input 
                type="password" 
                placeholder="Enter password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <br />
            <button onClick={handleLogin} style={{ marginTop: '10px' }}>Login</button>
        </div>
    );
}

export default Login;