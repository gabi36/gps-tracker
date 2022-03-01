import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import authHeader from "../constant/auth-header";

export const Form = (props) => {
    const [coordinates, setCoordinates] = useState({
        deviceId: "",
        startDate: "",
        endDate: ""
    })

    const [result, setResult] = useState("")

    const changeDeviceId = (e) => {
        setCoordinates(prevState => {
            return {...prevState, deviceId: e.target.value}
        });
    }

    const changeStartDate = (e) => {
        setCoordinates(prevState => {
            return {...prevState, startDate: e.target.value}
        })
    }

    const changeEndDate = (e) => {
        setCoordinates(prevState => {
            return {...prevState, endDate: e.target.value}
        })

    }

    const getPosition = () => {
        axios.get('http://localhost:8082/positions/readBetween?terminalId=' + coordinates.deviceId + '&startDate=' + coordinates.startDate + '&endDate=' + coordinates.endDate, {headers: authHeader()})
            .then(res => {
                setResult(JSON.stringify(res.data))
                props.onChangePositions(res.data)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    alert('An error occurred: 401 Unauthorized');
                    props.login(false);
                    localStorage.clear();
                }
            })
    }

    return (
        <div style={{textAlign: "center"}}>
            <h1>Admin Application Sketch</h1>
            <TextField id="standard-basic" label="Device Id" variant="standard" onChange={changeDeviceId}/><br/>
            <TextField id="standard-basic" label="Start Date" variant="standard" onChange={changeStartDate}/><br/>
            <TextField id="standard-basic" label="End Date" variant="standard" onChange={changeEndDate}/><br/>
            <Button variant="outlined" style={{marginTop: "10px"}} onClick={getPosition}>Get Position</Button>
            <h4>{result}</h4>
        </div>
    )
}