import { configureStore, createSlice } from '@reduxjs/toolkit';

// create a slice
export const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		profile: {},
	},
	reducers: {
	},
});

// config the store
const store = configureStore({
	reducer: {
		icon: profileSlice.reducer,
	},
});

// export default the store
export default store;

// export the action
export const iconAction = profileSlice.actions;
