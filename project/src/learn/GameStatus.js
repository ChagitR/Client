
import React, { useState } from "react";

export default function GameStatus(props) {
    const [timeUp, setTimeUp] = useState(false)
    let message=""
    let result=props.maskWord.find((x)=>x===" ___ ");
    if(result)
        message="game over";
        
    else
        message="you win!!!!!!!!!"

    return <h1>{message}</h1>    


}