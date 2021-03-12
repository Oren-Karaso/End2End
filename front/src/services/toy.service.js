// import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
import { httpService } from '../services/http.service.js';

const TOY_URL =
	process.env.NODE_ENV !== 'development'
		? '/api/toy/'
		: '//localhost:3030/api/toy/';

const KEY = 'toyDB';

export const toyService = {
	query,
	remove,
	getEmptyToy,
	save,
	getById,
};

// var gToys = _createToys();

function query() {
	return httpService.get('toy/');
}

function getById(id) {
	return httpService.get(`toy/${id}`);
}

function remove(id) {
	return httpService.delete(`toy/${id}`);
}

function save(toy) {
	if (toy._id) {
		return httpService.put(`toy/${toy._id}`, toy);
	} else {
		return httpService.post('toy/', toy);
	}
}

function getEmptyToy() {
	const toy = _createToy(null);
	toy._id = null;
	return toy;
}

function _createToys() {
	var toys = JSON.parse(localStorage.getItem(KEY));
	if (!toys || !toys.length) {
		const toys = [
			_createToy('Buzz-Lightyears', 150, 'kids'),
			_createToy('Talking Doll', 123, 'funny'),
			_createToy('Ballon', 3, 'birthday'),
		];
		localStorage.setItem(KEY, JSON.stringify(toys));
	}
	return toys;
}

function _createToy(name, price, type) {
	return {
		createdAt: Date.now(),
		name,
		price,
		type,
		inStock: true,
	};
}
