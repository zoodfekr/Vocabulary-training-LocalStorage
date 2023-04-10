import { MdRecordVoiceOver } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { HiSpeakerWave } from "react-icons/hi2";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState, useRef, Suspense, useContext } from 'react';

const Fastcontroler = () => {


    const [cposition, setcposition] = useState(false);


    return (
        <div className="speedycontroler bg-dark" style={{ width: (cposition ? "100%" : "0px"), transition: "all 1s" }}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                borderRadius: "25px",
                backgroundColor: "primary.main",
                width: "300px",
                p: "5px",
                display:"none"

            }}>
                <Button onClick={{}} variant='' className=' p-0' >
                    <MdRecordVoiceOver className='h3 m-1'></MdRecordVoiceOver>
                </Button>
                <Button onClick={{}} variant='' className=' p-0 ' >
                    <FiSearch className='h3 m-1'></FiSearch>
                </Button>
                <Button onClick={{}} variant='' className=' p-0 ' >
                    <IoMdAddCircleOutline className='h3 m-1'></IoMdAddCircleOutline>
                </Button>
                <Button onClick={{}} variant='' className=' p-0 ' >
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