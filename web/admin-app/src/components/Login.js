import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import axios from "axios";

export const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const performLogin = () => {
        const userDTO = {username: username, password: password};
        axios.post('http://localhost:8082/users', userDTO)
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                props.login(true);
            })
            .catch(()=>{
                alert("Wrong username or password!")
            })
    }

    return (
        <div style={{textAlign: "center", marginTop: "50px"}}>
            <TextField label="username" variant="standard" onChange={changeUsername} value={username}/><br/>
            <TextField label="password" variant="standard" type="password" onChange={changePassword} value={password}/><br/>
            <Button variant="outlined" style={{marginTop: "10px"}} onClick={performLogin}>Login</Button>
        </div>
    )
}