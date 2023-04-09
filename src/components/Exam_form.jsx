import { Box, Button, ListItemText } from "@mui/material";
import { Form, Link, useNavigate } from "react-router-dom";
import { BiReset } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { ErrorMessage, Field, Formik } from "formik";
import { tranclateSchema } from "../validation/validation";
import { useContext, useEffect, useState } from "react";
import Appcontext from "../context/Context";
import Exam_results from './Exam_results';



const Exam = () => {

    const navigate = useNavigate();
    const { datawords, setmistake, setScore, mistake, Score } = useContext(Appcontext);

    let time;
    const timer = (event) => {
        clearTimeout(time);
        time = setTimeout(() => console.log(event.target.value), 1000);
    }

    const [persian_bank, setpersian_bank] = useState();
    const [english_bank, setenglish_bank] = useState();
    const [userdata, setuserdata] = useState(); //دیتایی که کاربر در لیست وارد می نماید

    const [formData, setFormData] = useState({
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: '',
        seven: '',
        eight: '',
        nine: '',
        ten: ''
    });


    const randomer = (data) => {
        let number = [];
        let word = [];
        for (let i = 0; i < data.length + 100; i++) {
            const random_number = Math.floor(Math.random() * data.length);
            if (number.length < 10) {
                if (number.includes(random_number) === false) {
                    number.push(random_number);
                    word.push(data[random_number])
                }
            } else { break }
        }
        return word;
    }
    const words = JSON.parse(window.localStorage.getItem('words'));

    useEffect(() => {
        const endData = randomer(words);
        setpersian_bank(endData.map(x => x.persian.toLowerCase().trim()));
        setenglish_bank(endData.map(x => x.english.toLowerCase().trim()));
    }, []);


    useEffect(() => {
        console.log("userdata", userdata);
        if (english_bank) { equalsCheck(english_bank, userdata) }
    }, [userdata]);

    useEffect(() => {
        console.log("mistake", mistake);
        if (mistake) {
            setScore(`تعداد کلمات درست شما: ${10 - mistake.length}/10 `);
            navigate('/Exam/results')
        }

    }, [mistake]);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setuserdata(Object.values(formData).map((value) => (value).trim().toLowerCase()))
    }


    function equalsCheck(a, b) {
        let mistake_words = [];
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                mistake_words.push(b[i]);
            } else {
                console.log("true")
            }
        }
        setmistake(mistake_words);
    }


    if (persian_bank) {

        if (datawords.length >= 10) {
            return (
                <Box className="" sx={{ mt: 1, p: 1 }}>
                    <Box sx={{ my: 1, border: 1, borderRadius: "10px", p: 2 }} className="container bg-light">
                        <form onSubmit={handleSubmit} className="d-flex flex-wrap ">
                            <div className="d-flex col-12 col-md-6 mt-1">
                                <label htmlFor="one" className="form-control" style={{ background: "lavender" }}>{persian_bank[0]}</label>
                                <input type="text" className="form-control" id="one" name="one" value={formData.one} onChange={handleChange} required />
                            </div>

                            <div className="d-flex col-12 col-md-6 mt-1">
                                <label htmlFor="two" className="form-control" style={{ background: "lavender" }}>{persian_bank[1]}</label>
                                <input type="text" className="form-control" id="two" name="two" value={formData.two} onChange={handleChange} required />
                            </div>

                            <div className="d-flex col-12 col-md-6 mt-1">
                                <label htmlFor="three" className="form-control" style={{ background: "lavender" }}>{persian_bank[2]}</label>
                                <input type="text" className="form-control" id="three" name="three" value={formData.three} onChange={handleChange} required />
                            </div>

                            <div className="d-flex col-12 col-md-6 mt-1">
                                <label htmlFor="four" className="form-control" style={{ background: "lavender" }}>{persian_bank[3]}</label>
                                <input type="text" className="form-control" id="four" name="four" value={formData.four} onChange={handleChange} required />
                            </div>

                            <div className="d-flex col-12 col-md-6 mt-1">
                                <label htmlFor="five" className="form-control" style={{ background: "lavender" }}>{persian_bank[4]}</label>
                                <input type="text" className="form-control" id="five" name="five" value={formData.five} onChange={handleChange} required />
                            </div>

                            <div className="d-flex col-12 col-md-6 mt-1">
                                <label htmlFor="six" className="form-control" style={{ background: "lavender" }}>{persian_bank[5]}</label>
                                <input type="text" className="form-control" id="six" name="six" value={formData.six} onChange={handleChange} required />
                            </div>

                            <div className="d-flex col-12 col-md-6 mt-1">
                                <label htmlFor="seven" className="form-control" style={{ background: "lavender" }}>{persian_bank[6]}</label>
                                <input type="text" className="form-control" id="seven" name="seven" value={formData.seven} onChange={handleChange} required />
                            </div>

                            <div className="d-flex col-12 col-md-6 mt-1">
                                <label htmlFor="eight" className="form-control" style={{ background: "lavender" }}>{persian_bank[7]}</label>
                                <input type="text" className="form-control" id="eight" name="eight" value={formData.eight} onChange={handleChange} required />
                            </div>

                            <div className="d-flex col-12 col-md-6 mt-1">
                                <label htmlFor="nine" className="form-control" style={{ background: "lavender" }}>{persian_bank[8]}</label>
                                <input type="text" className="form-control" id="nine" name="nine" value={formData.nine} onChange={handleChange} required />
                            </div>

                            <div className="d-flex col-12 col-md-6 mt-1">
                                <label htmlFor="ten" className="form-control" style={{ background: "lavender" }}>{persian_bank[9]}</label>
                                <input type="text" className="form-control" id="ten" name="ten" value={formData.ten} onChange={handleChange} required />
                            </div>

                            <button className="btn btn-primary m-2" type="submit">ثبت آزمون</button>
                        </form>
                    </Box>






                </ Box >
            )
        } else {
            return (
                <Box className="border bg-light d-flex justify-content-center" sx={{ mt: 1, p: 1 }}>
                    <div class="alert alert-danger" role="alert">
                        برای ورود به این بخش باید حداقل 10 کلمه وارد کنید                     </div>

                </Box>
            )
        }



    }


};

export default Exam;

