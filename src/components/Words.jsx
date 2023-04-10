import React, { useEffect, useState, useRef, useContext, Suspense } from 'react';
import Word from './Word';
import AppContext from '../context/Context';
import { Box, Button, ListItemText } from "@mui/material";
import { MdRecordVoiceOver } from "react-icons/md";
const Words = () => {
	const { datawords, costomcolor, SearchParams } = useContext(AppContext);



	const handlesearch = (g) => {
		if (SearchParams.get("search")) {
			let filteredword = g.persian.toLowerCase().includes(SearchParams.get("search")) + g.english.toLowerCase().includes(SearchParams.get("search").toLowerCase())
			return filteredword;
		} else {
			return true;
		}
	}

	const reader = (event) => {
		let utterance = new SpeechSynthesisUtterance(event);
		utterance.volume = 1; // From 0 to 1
		utterance.rate = 0.5; // From 0.1 to 10
		utterance.pitch = 0; // From 0 to 2
		utterance.lang = 'en';
		speechSynthesis.speak(utterance);
	}

	const reader_english = () => {
		let counter = 0;
		let english_word = [];
		datawords.map(x => english_word.push(x.english));

		const timer = setInterval(() => {
			if (counter >= datawords.length - 1) { clearInterval(timer) }
			reader(english_word[counter]);
			counter++
		}, 2500);
	}



	return (

		<>


			{/* <div className="speedycontroler  col-12 col-sm-4" >
				<Box >
					<Button onClick={reader_english} variant='contained'>
						<MdRecordVoiceOver></MdRecordVoiceOver>
					</Button>
					<Button onClick={reader_english} variant='contained'>
						<MdRecordVoiceOver></MdRecordVoiceOver>
					</Button>
					<Button onClick={reader_english} variant='contained'>
						<MdRecordVoiceOver></MdRecordVoiceOver>
					</Button>
					<Button onClick={reader_english} variant='contained'>
						<MdRecordVoiceOver></MdRecordVoiceOver>
					</Button>
					<Button onClick={reader_english} variant='contained'>
						<MdRecordVoiceOver></MdRecordVoiceOver>
					</Button>

				</Box>
			</div> */}

			<div className="words">

				<ol className=" justify-content-start d-flex flex-wrap p-0 ">
					{datawords ?
						datawords
							.filter(handlesearch)
							.map(datawords => {
								return (
									// <div className='border border-danger d-flex justify-content-end'>
									<li className=" xs-12 sm-3 li">
										<Word datawords={datawords} costomcolor={costomcolor} ></Word>
									</li>
									// </div>
								)
							}).reverse() : null}
				</ol>
			</div>

		</>
	)
};

export default Words;