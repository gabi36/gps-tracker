import React, {useEffect, useState} from "react";
import {Form} from "./Form";
import {SimpleMap} from "./Map";
import {Login} from "./Login";

export const App = () => {
    const [loggedId, setLoggedIn] = useState(false)
    const [positions, setPositions] = useState('');

    useEffect(() => {
        setPositions("")
    }, [loggedId]);

    const changePositions = (newPosition) => {
        setPositions(newPosition)
    }

    const login = (bool) => {
        setLoggedIn(bool)
    }

    return (
        loggedId ?
            <div>
                <Form onChangePositions={changePositions} login={login}/>
                <SimpleMap positions={positions}/>
            </div> :
            <Login login={login}/>
    )
}