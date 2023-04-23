import {
	getRequest,
	postRequest,
	putRequest,
	deleteRequest,
} from "../../api/api";
import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../utils/storage.utils";
export const expenseSlice = createSlice({
	name: "expense",
	initialState: {
		expenses: [],
		loading: false,
	},
	reducers: {
		startLoading: (state) => {
			return { ...state, loading: true };
		},
		stopLoading: (state) => {
			return { ...state, loading: false };
		},
		setExpenses: (state, action) => {
			return {
				...state,
				loading: false,
				expenses: [...action.payload.expenses],
			};
		},
		expenseFailure: (state, action) => {
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		},
		createExpenseSuccess: (state, action) => {
			const { key, value } = action.payload;
			return { ...state, [key]: value };
		},

		updateExpenseSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			const { key, value } = action.payload;
			return { ...state, [key]: value };
		},
		deleteExpenseSuccess: (state, action) => {
			const { expenseId } = action.payload;
			const deleteExpense = state.expenses.filter(
				(expense) => expense.id !== expenseId
			);
			return {
				...state,
				loading: false,
				expenses: deleteExpense,
			};
		},
	},
});

export const createNewExpense = (expenseData) => async (dispatch) => {
	try {
		const response = await postRequest("/expenses/createExpense", expenseData);
		if (response.error) {
			dispatch(expenseFailure(response.error));
		} else {
			dispatch(createExpenseSuccess(response.result));
		}
	} catch (error) {
		dispatch(expenseFailure(error.message));
	}
};

export const getExpenses = () => async (dispatch, getState) => {
	const loading = getState().expense.loading;
	if (loading) return;
	dispatch(startLoading());
	const { status, result, error } = await getRequest(
		"/expenses/readAllExpenses"
	);
	dispatch(setExpenses({ expenses: result.expenses }));
};
export const getOneExpense = (expenseId) => async (dispatch, getState) => {
	const loading = getState().expense.loading;
	if (loading) return;
	dispatch(startLoading());
	const { status, result, error } = await getRequest(
		`/expenses/readExpense/${expenseId}`
	);
	dispatch(setExpenses({ expenses: [result.expense] }));
};
export const updateExpense = (expense) => async (dispatch) => {
	const token = getItem("token");
	try {
		const response = await putRequest(
			`/expenses/updateExpense/${expense.expenseId}`,
			expense,
			token
		);
		if (response.error) {
			dispatch(expenseFailure(response.error));
		} else {
			dispatch(updateExpenseSuccess(response.result));
		}
	} catch (error) {
		dispatch(expenseFailure(error.message));
	}
};
export const deleteExpense = (expenseId) => async (dispatch) => {
	const token = getItem("token");
	try {
		const response = await deleteRequest(
			`/expenses/deleteExpense/${expenseId}`,
			token
		);
		if (response.error) {
			dispatch(expenseFailure(response.error));
		} else {
			dispatch(deleteExpenseSuccess({ expenseId }));
		}
	} catch (error) {
		dispatch(expenseFailure(error.message));
	}
};

export const {
	startLoading,
	stopLoading,
	setExpenses,
	createExpenseSuccess,
	updateExpenseSuccess,
	expenseFailure,
	deleteExpenseSuccess,
} = expenseSlice.actions;
export default expenseSlice.reducer;
