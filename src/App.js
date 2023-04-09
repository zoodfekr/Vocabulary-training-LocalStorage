import React, { Suspense } from 'react';
import { Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Input from "./components/Input";
import Words from './components/Words';
import Navbar from './components/Navbar';
import Appcontext from './context/Context';
import { useEffect, useState } from 'react';
import './style/style.scss';
import { createword, dbwords, english_tranclate, persian_tranclate, remover, tranclate, update } from './services/services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Word_editor from './components/Word_editor';
import Error from './components/Error';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { confirmAlert } from 'react-confirm-alert';
import Exam from './components/Exam';
import Exam_results from './components/Exam_results';
import Exam_form from './components/Exam_form';
const App = () => {
  let location = useLocation();
  const [word, setWord] = useState(null); //کلمه دریافتی از کاربر
  const [meaning, setmeaning] = useState(null); // کلمه معنی شده از گوگل
  const [datawords, setdatawords] = useState(null); // کلمه های خوانده شده از سرور داخلی
  const [invalue, setinvalue] = useState(null); // خالی کننده مقدار ورودی ها
  const navigate = useNavigate();
  const [wordcolor, setwordcolor] = useState(null);//تعین رنگ کلمه
  const [persianshow, setpersianshow] = useState(true);//نمایش کلمات فارسی
  const [englishshow, setenglishshow] = useState(true);// نمایش کلمات انگلیسی
  let [SearchParams, setSearchParams] = useSearchParams();
  const [mistake, setmistake] = useState(); // کلمات اشتباه کاربر
  const [Score, setScore] = useState(); //امنتیاز کاربر

  //  ترجمه کلمه
  useEffect(() => {
    const randomcolor = `rgb( ${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 200)},${Math.floor(Math.random() * 255)},0.45)`;
    const fetchData_google = async () => {
      if (word.english && word.persian) {

        const lid = JSON.parse(window.localStorage.getItem('id'));
        const id = parseInt(lid) + 1;
        window.localStorage.setItem('id', JSON.stringify(id));

        setmeaning({ english: word.english, persian: word.persian, background: randomcolor, id })
        setinvalue("");
      } else {

        if (word.english && !word.persian) {
          setinvalue("");
          try {
            let { data: per, status } = await english_tranclate(word.english)

            const lid = JSON.parse(window.localStorage.getItem('id'));
            const id = parseInt(lid) + 1;
            window.localStorage.setItem('id', JSON.stringify(id));

            setmeaning({ english: word.english, persian: per[0][0][0], background: randomcolor, id })
            setinvalue(null);
          } catch (err) {
            setinvalue(null);
            // console.log(' مشکل دریافت دیتا انگلیسی');
            alert("عدم دسترس به سرور")
          }
        }
        else if (word.persian && !word.english) {
          setinvalue("");
          try {
            let { data: eng } = await persian_tranclate(word.persian);

            const lid = JSON.parse(window.localStorage.getItem('id'));
            const id = parseInt(lid) + 1;
            window.localStorage.setItem('id', JSON.stringify(id));

            setmeaning({ english: eng[0][0][0], persian: word.persian, background: randomcolor, id });
            setinvalue(null);
          } catch (err) {
            setinvalue(null);
            alert("عدم دسترس به سرور")
            // console.log('مشکل دریافت دیتا فارسی');
          }
        }
      }
    };
    fetchData_google();
  }, [word]);


  // ثبت و خواندن اطلاعات از  سرور داخلی
  useEffect(() => {

    setmeaning(null);
    const creator = () => {
      if (meaning != null && meaning.english != meaning.persian) {
        try {
          createword(meaning);
          toast.success("کلمه ساخته شد");
          // console.log("کلمه ثبت شد");
          setinvalue(null)
        } catch (err) {
          // console.log("مشکل ثبت در سرور داخلی");
        }
      }
      if (meaning == null) {
        const words = JSON.parse(window.localStorage.getItem('words'));
        setdatawords(words);
        setinvalue(null)
      }
    };
    creator()
  }, [meaning]);


  //حذف کننده کلمه
  const clear_s1 = id => {

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          < div className='custom-ui' >
            <div className='border border-danger p-5 container custom-ui-message' style={{
              backgroundColor: "#E5E8E8",
              borderRadius: "25px"
            }} dir='rtl'>
              <h3 className='text-danger'>{`در حال حذف کلمه هستید!!!`}</h3>
              <p className='text-dark'>آیا اطمینان دارید؟</p>

              <button className='btn btn-primary mx-1' onClick={onClose}>خیر</button>
              <button
                className='btn btn-danger mx-1'
                onClick={() => {
                  clear_s2(id); onClose();
                }}
              >
                بله
              </button>
            </div>
          </div >
        );
      }
    });

  };
  const clear_s2 = (id) => {
    try {
      remover(id);
      toast.success("کلمه حذف شد")
      let words = dbwords();
      setdatawords(words);
    } catch {
      // console.log("مشکل در حذف کلمه");
    }
  }

  // چک کننده کلمات تکراری
  const checker = (value) => {
    try {
      let ebank = datawords.map(x => x.english);
      let pbank = datawords.map(x => x.persian);
      setinvalue("");
      if (ebank.includes(value.english) || pbank.includes(value.persian)) {
        setinvalue(null);
        alert("کلمه شما از قبل وجود دارد")
      } else {
        setWord(value)
        setinvalue(null);
      }
    } catch {
      setWord(value)
      setinvalue(null);
    }
  }

  //به روزرسانی کلمه
  const handleupdate = (id, data) => {
    update(id, data);
    toast.success("کلمه به روز شد  ")
    navigate('/');
    const words = JSON.parse(window.localStorage.getItem('words'));
    setdatawords(words);
  }

  // مقدار دهی اولیه برنامه
  useEffect(() => {
    setSearchParams({});// خالی کننده مقدار سرج در نوبار
    const words = JSON.parse(window.localStorage.getItem('words'));
    const id = JSON.parse(window.localStorage.getItem('id'));
    if (words == null) {
      window.localStorage.setItem('words', JSON.stringify([]));
    }
    else if (id == null) {
      window.localStorage.setItem('id', JSON.stringify(1));
    }

    const costomcolor = JSON.parse(window.localStorage.getItem('word_bgcolor'));
    if (costomcolor == null) {
      // console.log("set initial color")
      window.localStorage.setItem('word_bgcolor', JSON.stringify("colorly"));
    }
  }, []);

  const [open, setOpen] = React.useState(false);




  // theme
  const [mode, setmode] = useState(true);
  const theme = createTheme({
    direction: "rtl",
    typography: {
      fontSize: 12,
      fontFamily: [
        'vazir',
        'IranNastaliq',
        'B_Mitra_Bold'
      ].join(','),
    },
    palette: {
      mode: mode ? "light" : "dark",
      C_blue: {
        main: mode ? "#93BFCF" : "#6096B4",
      },
      C_gray: {
        main: mode ? "#9a9a9a" : "#6f6f6f",
      },
      C_purple: {
        main: mode ? "#A084DC" : "#645CBB",
      },

    }
  })
  const cachertl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
  })

  const costomcolor = JSON.parse(window.localStorage.getItem('word_bgcolor'));




  return (
    <Appcontext.Provider value={{
      datawords, clear_s1, checker,
      invalue, handleupdate, setmode,
      costomcolor, setwordcolor, theme,
      persianshow, englishshow, setpersianshow,
      setenglishshow, setSearchParams, SearchParams,
      setOpen, open, setmistake, mistake, setScore, Score
    }}>
      <CacheProvider value={cachertl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<Navbar />}>
              <Route path='/' element={<Input />}></Route>
              <Route path='/' element={<Words />}></Route>
              <Route path='/editor/:wid' element={<Word_editor />} />
              <Route path='/Exam' element={<Exam />} >
                <Route path='/Exam' element={<Exam_form />} />
                <Route path='/Exam/results' element={<Exam_results />} />
              </Route>
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </ThemeProvider>
      </CacheProvider>
    </Appcontext.Provider >
  )
};

export default App;
