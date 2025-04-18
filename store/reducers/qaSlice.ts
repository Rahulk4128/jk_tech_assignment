// store.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the question object
interface Question {
	question: string;
	timestamp: string;
}

// Create a slice for Q&A
const qaSlice = createSlice({
	name: 'qa',
	initialState: {
		history: [] as Question[],
	},
	reducers: {
		addQuestion: (state, action: PayloadAction<Question>) => {
			state.history.push(action.payload);
            localStorage.setItem('qaHistory', JSON.stringify(state.history));
		},
        loadQuestions: (state) => {
            const storedQuestions = localStorage.getItem('qaHistory');
            if (storedQuestions) {
                state.history = JSON.parse(storedQuestions);
            }
        },
	},
});

// Export actions and reducer
export const { addQuestion, loadQuestions } = qaSlice.actions;
export const qaReducer = qaSlice.reducer;
