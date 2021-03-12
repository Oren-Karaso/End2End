import Vue from 'vue';
import Vuex from 'vuex';
import { toyService } from '../services/toy.service.js';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	state: {
		toys: [],
		filterBy: null,
		isLoading: false,
	},
	getters: {
		filteredToys(state) {
			const regex = new RegExp(state.searchBy, 'i');
			return state.toys;
		},
		toys(state) {
			return state.toys;
		},
		isLoading(state) {
			return state.isLoading;
		},
	},
	mutations: {
		setToys(state, { toysToShow }) {
			state.toys = toysToShow;
		},
		setFilter(state, { filterBy }) {
			state.filterBY = filterBy;
			// console.log(filterBy);
		},
		add(state, { toy }) {
			state.toys.push(toy);
		},
		update(state, { toy }) {
			const idx = state.toys.findIndex((t) => t._id === toy._id);
			state.toys.splice(idx, 1, toy);
			toyService.save(toy);
		},
		removeToy(state, { toyId }) {
			const idx = state.toys.findIndex((t) => t._id === toyId);
			state.toys.splice(idx, 1);
		},
		changeIsLoading(state) {
			state.isLoading = !state.isLoading;
		},
	},
	actions: {
		async loadToys({ commit, state }) {
			try {
				commit({ type: 'changeIsLoading' });
				const toysToShow = await toyService.query(state.filterBY);
				commit({ type: 'changeIsLoading' });
				commit({ type: 'setToys', toysToShow });
			} catch (err) {
				console.log('Store: Cannot load Toys', err);
				throw new Error('Cannot load Toys');
			}
		},
		async saveToy(context, { toy }) {
			try {
				context.commit({ type: 'changeIsLoading' });
				const type = toy._id ? 'update' : 'add';
				const savedToy = await toyService.save(toy);
				context.commit({ type, toy: savedToy });
				context.commit({ type: 'changeIsLoading' });
				return savedToy;
			} catch (err) {
				console.log('Store: Cannot save toy', err);
				throw new Error('Cannot save toy');
			}
		},
		async removeToy(context, payload) {
			try {
				context.commit({ type: 'changeIsLoading' });
				await toyService.remove(payload.toyId);
				context.commit(payload);
				context.commit({ type: 'changeIsLoading' });
			} catch (err) {
				console.log('Store: Cannot remove toy', err);
				throw new Error('Cannot remove toy');
			}
		},
		// setFilter({ commit }, { filterBy }) {
		// 	toyService.query(filterBy).then((toys) => {
		// 		commit({ type: 'setToys', toys });
		// 	});
		// },
	},
	modules: {},
});
