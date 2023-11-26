import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./scroll.css"

function Scroll (){
    const [backtotop , setbacktotop]=useState(false)
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 100){
                setbacktotop(true)
            }else{
                setbacktotop(false)
            }
        })
    },[])
    const scrollup =()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
    return(
        <>
        {  backtotop &&
      <button onClick={scrollup} className="button-scroll"><FontAwesomeIcon icon={faChevronUp}   className="scroll-icon"/></button>         
     }  
        </>
    )
}
export default Scroll;