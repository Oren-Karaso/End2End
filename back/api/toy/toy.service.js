const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');

async function query() {
	const collection = await dbService.getCollection('toy');
	const toys = await collection.find().toArray();
	return toys;
}

async function add(toy) {
	try {
		// peek only updatable fields!

		const collection = await dbService.getCollection('toy');
		await collection.insertOne(toy);
		return toy;
	} catch (err) {
		logger.error('cannot add toy', err);
		throw err;
	}
}

async function update(toy) {
	const { name, inStock, type, price } = toy;
	
	try {
		const collection = await dbService.getCollection('toy');
		await collection.updateOne(
			{ _id: ObjectId(toy._id) },
			{ $set: {name, inStock, type, price }}
		);
		return toy;
	} catch (err) {
		logger.error('cannot update toy', err);
		throw err;
	}
}

async function remove(toyId) {
	try {
		const collection = await dbService.getCollection('toy');
		await collection.deleteOne(toyId);
	} catch (err) {
		logger.error(`cannot remove toy ${toyId}`, err);
		throw err;
	}
}

// function getById(toyId, user) {
// 	const toy = gToys.find((toy) => toy._id === toyId);
// 	return Promise.resolve(toy);
// }

// function getToysCountById(userId) {
// 	let toysCount = 0;
// 	gToys.forEach((toy) => {
// 		if (toy.creator._id === userId) toysCount++;
// 	});
// 	return Promise.resolve(toysCount);
// }

// function remove(toyId, user) {
// 	const idx = gToys.findIndex((toy) => toy._id === toyId);
// 	if (idx < 0) return Promise.reject('no such toy');
// 	const toy = gToys[idx];
// 	// if(!user.isAdmin && toy.creator._id !== user._id) return Promise.reject('Can\'t touch this!')
// 	gToys.splice(idx, 1);
// 	// userService.updateUserToyCountById(user._id, -1);
// 	return _saveToysToFile();
// }

// function save(toy) {
// 	if (toy._id) {
// 		const idx = gToys.findIndex((currToy) => currToy._id === toy._id);
// 		if (idx < 0) return Promise.reject('this toy does not exist');
// 		gToys.splice(idx, 1, toy);
// 	} else {
// 		toy._id = utilService.makeId();
// 		gToys.unshift(toy);
// 	}

// 	return _saveToysToFile().then(() => toy);
// }

module.exports = {
	query,
	add,
	remove,
	update,
};
