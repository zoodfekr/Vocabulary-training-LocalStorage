import React, { useEffect, useState, useRef, Suspense } from 'react';
import { UseState } from 'react';
import { Outlet } from 'react-router-dom';
import '../style/style.scss';
import { Form, Field, Formik, ErrorMessage } from 'formik';
import { tranclateSchema } from "../validation/validation";
import { createword, dbwords, english_tranclate, persian_tranclate, remover, tranclate, update } from '../services/services';
import Words from './Words';
import Input from './Input';
import Logo from './Logo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Navbar = () => {

	const reader=()=>{
		const data = JSON.parse(window.localStorage.getItem('words'))
		console.log("data>>>2", data)
	  }

	return (
		<>
			<nav class="navbar bg-dark navbar-dark navbar-expand-lg   shadow-lg" dir="rtl" >

				<div class="container" id="top">
					<Logo />
					{/* {location.pathname == "/" ? <Search query={query} finder={finder} /> : null} */}
				</div >
			</nav >

			<div className='d-flex'>
				<button onClick={reader}>خواندن</button>

				<Outlet></Outlet>

			</div>

			<div>
				<ToastContainer
					position="top-center"
					autoClose={1000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					// pauseOnFocusLoss
					draggable
					// pauseOnHover
					theme="colored"
				/>
			</div>
		</>

	)

};

export default Navbar;