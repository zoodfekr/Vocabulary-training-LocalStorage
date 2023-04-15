import { MdRecordVoiceOver } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { HiSpeakerWave } from "react-icons/hi2";
import { BsFillStopCircleFill } from "react-icons/bs";

import { Box, Button } from "@mui/material";
import React, { useEffect, useState, useRef, Suspense, useContext } from 'react';
import Appcontext from "../context/Context";

const Fastcontroler = () => {

    const { datawords } = useContext(Appcontext);
    const [cposition, setcposition] = useState(false);
    const [read, setread] = useState(false);

    const reader = (event) => {
        let utterance = new SpeechSynthesisUtterance(event);
        utterance.volume = 1; // From 0 to 1
        utterance.rate = 0.5; // From 0.1 to 10
        utterance.pitch = 0; // From 0 to 2
        utterance.lang = 'en';
        speechSynthesis.speak(utterance);
    }



    const reader_english = (event) => {
        console.log(event)
        let counter = 0;
        let english_word = [];
        setread(true);
        datawords.map(x => english_word.push(x.english));

        let timer_log = setInterval(() => {
            if (counter >= datawords.length || event == false) {
                clearInterval(timer_log);
                setread(false);
            } else {
                // reader(english_word[counter]);
                console.log(english_word[counter], counter);
                counter++;
            }
        }, 500);
    }








    return (
        <div className="speedycontroler" style={{ width: (cposition ? "100%" : "50px"), transition: "all 1s" }}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                borderRadius: "25px",
                backgroundColor: "primary.main",
                width: "300px",
                p: "5px",
                // display:"none"

            }}>
                {read ?
                    <Button onClick={{}} variant='' className=' p-0' style={{ display: (cposition ? "inline" : "none"), transition: "all 3s" }}>
                        <BsFillStopCircleFill className='h3 m-1'></BsFillStopCircleFill>
                    </Button> :
                    <Button disabled onClick={() => reader_english()} variant='' className=' p-0' style={{ display: (cposition ? "inline" : "none"), transition: "all 3s" }}>
                        <MdRecordVoiceOver className='h3 m-1'></MdRecordVoiceOver>
                    </Button>}

                <Button onClick={() => document.getElementById("Search").focus()} variant='' className=' p-0 ' style={{ display: (cposition ? "inline" : "none"), transition: "all 3s" }}>
                    <FiSearch className='h3 m-1'></FiSearch>
                </Button>

                <Button onClick={() => document.getElementById("e_in").focus()} variant='' className=' p-0 ' style={{ display: (cposition ? "inline" : "none"), transition: "all 3s" }}>
                    <IoMdAddCircleOutline className='h3 m-1'></IoMdAddCircleOutline>
                </Button>
                <Button onClick={() => document.getElementById("p_in").focus()} variant='' className=' p-0 ' style={{ display: (cposition ? "inline" : "none"), transition: "all 3s" }}>
                    <IoIosAddCircle className='h3 m-1'></IoIosAddCircle>
                </Button>
                <Button onClick={() => setcposition((prevLoading) => !prevLoading)} variant='' className=' p-0 ' >
                    <AiOutlineClose className='h3 m-1'></AiOutlineClose>
                </Button>
            </Box>
        </div>
    )
}


export default Fastcontroler;