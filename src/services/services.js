
import axios from "axios";



// tranclate - googleAPI
export const english_tranclate = (word) => {
	if (word != null) {
		return axios.get(`https://translate.googleapis.com/translate_a/single`, {
			params: {
				client: 'gtx',
				sl: 'en',
				tl: 'fa',
				dt: 't',
				q: word
			}
		})
	}
	return new Promise((resolve, reject) => reject([]));
};

export const persian_tranclate = (word) => {
	if (word != null) {
		return axios.get(`https://translate.googleapis.com/translate_a/single`, {
			params: {
				client: 'gtx',
				sl: 'fa',
				tl: 'en',
				dt: 't',
				q: word
			}
		})
	}
	// return new Promise((resolve, reject) => reject([]));
};


// return all words
export const dbwords = () => {
	return JSON.parse(window.localStorage.getItem('words'))
}

// return word
export const word_info = (id) => {
	return JSON.parse(window.localStorage.getItem('words')).filter(x => x.id == id)
}

// post new word
export const createword = (data) => {
	const words = JSON.parse(window.localStorage.getItem('words'));
	words.push(data)
	window.localStorage.setItem('words', JSON.stringify(words));
};

// delete word
export const remover = (id) => {
	const words = JSON.parse(window.localStorage.getItem('words'));
	const del = words.filter(x => x.id != id)
	window.localStorage.setItem('words', JSON.stringify(del));
}


// update word
export const update = (id, data) => {
	const words = JSON.parse(window.localStorage.getItem('words'));
	const other = words.filter(x => x.id != id)
	other.push(data);
	window.localStorage.setItem('words', JSON.stringify(other));
}