import { useContext } from "react";
import Appcontext from "../context/Context";
import { useEffect } from "react";
import { BiReset } from "react-icons/bi";
import { Form, Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Exam_results = () => {

    const { mistake, Score, setmistake } = useContext(Appcontext);
    const navigate = useNavigate();

    return (
        <>
            <div className="container mt-2">

                <div class="card d-flex justify-content-center">
                    <h5 class="card-header">نتیجه آزمون</h5>
                    <div class="card-body">
                        <h5 class="card-title">{Score}</h5>
                        <p class="card-text">{`کلماتی که استباه وارد کرده اید: ${mistake.filter(x => x.length > 1)}`}</p>
                        <Button className="text-white" variant="contained" onClick={() => { setmistake(null); navigate('/Exam') }}
                            endIcon={<BiReset ></BiReset>}
                            sx={{ py: 0, m: 1 }}>آزمون مجدد</ Button >
                    </div>
                </div>


            </div>
        </>
    )
}

export default Exam_results;
