const logger = require('../../services/logger.service');
const userService = require('../user/user.service');
const toyService = require('./toy.service');

async function getToys(req, res) {
	try {
		const toys = await toyService.query(req.query);
		res.send(toys);
	} catch (err) {
		logger.error('Cannot get toys', err);
		res.status(500).send({ err: 'Failed to get toys' });
	}
}

async function addToy(req, res) {
	try {
		var toy = req.body;
		toy = await toyService.add(toy);
		res.send(toy);
	} catch (err) {
		logger.error('Failed to add toy', err);
		res.status(500).send({ err: 'Failed to add toy' });
	}
}

async function deleteToy(req, res) {
	try {
		await toyService.remove(req.params._id);
		res.send({ msg: 'Deleted successfully' });
	} catch (err) {
		logger.error('Failed to delete toy', err);
		res.status(500).send({ err: 'Failed to delete toy' });
	}
}

async function updateToy(req, res) {
	try {
		var toy = req.body;
		toy = await toyService.update(toy);
		res.send(toy);
	} catch (err) {
		logger.error('Failed to update toy', err);
		res.status(500).send({ err: 'Failed to update toy' });
	}
}

module.exports = {
	getToys,
	addToy,
	deleteToy,
	updateToy,
};
