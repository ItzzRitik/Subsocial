import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTweets = createAsyncThunk('test/fetchTweets', async (query: string | undefined) => {
	if (!query) return [];

	const req = await fetch(`/api/twitter/search?q=${encodeURIComponent(query)}`);
	const { data = [] } = await req.json();

	return data;
});

export const tweetsSlice = createSlice({
	name: 'tweets',
	initialState: {
		tweets: [],
		loading: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchTweets.fulfilled, (state, { payload }) => ({
			...state,
			tweets: payload,
			loading: false,
		}));
		builder.addCase(fetchTweets.pending, (state) => ({
			...state,
			loading: true,
		}));
	},
});

const store = configureStore({
	reducer: {
		tweets: tweetsSlice.reducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
