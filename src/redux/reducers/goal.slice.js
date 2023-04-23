import {
	getRequest,
	postRequest,
	putRequest,
	deleteRequest,
} from "../../api/api";
import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../utils/storage.utils";
export const goalSlice = createSlice({
	name: "goal",
	initialState: {
		goals: [],
		loading: false,
	},
	reducers: {
		startLoading: (state) => {
			return { ...state, loading: true };
		},
		stopLoading: (state) => {
			return { ...state, loading: false };
		},
		setGoals: (state, action) => {
			return {
				...state,
				loading: false,
				goals: [...action.payload.goals],
			};
		},
		goalFailure: (state, action) => {
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		},
		createGoalSuccess: (state, action) => {
			const { key, value } = action.payload;
			return { ...state, [key]: value };
		},
		updateGoalSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			const { key, value } = action.payload;
			return { ...state, [key]: value };
		},
		deleteGoalSuccess: (state, action) => {
			const { goalId } = action.payload;
			const deleteGoal = state.goals.filter((goal) => goal.id !== goalId);
			return {
				...state,
				loading: false,
				goals: deleteGoal,
			};
		},
	},
});

export const createNewGoal = (goalData) => async (dispatch) => {
	try {
		const response = await postRequest("/goals/createGoal", goalData);
		if (response.error) {
			dispatch(goalFailure(response.error));
		} else {
			dispatch(createGoalSuccess(response.result));
		}
	} catch (error) {
		dispatch(goalFailure(error.message));
	}
};

export const getGoals = () => async (dispatch, getState) => {
	const loading = getState().goal.loading;
	if (loading) return;
	dispatch(startLoading());
	const { status, result, error } = await getRequest("/goals/readAllGoals");
	dispatch(setGoals({ goals: result.goals }));
};

export const getOneGoal = (goalId) => async (dispatch, getState) => {
	const loading = getState().goal.loading;
	if (loading) return;
	dispatch(startLoading());
	const { status, result, error } = await getRequest(
		`/goals/readGoal/${goalId}`
	);
	dispatch(setGoals({ goals: [result.goal] }));
};

export const updateGoal = (goal) => async (dispatch) => {
	const token = getItem("token");
	try {
		const response = await putRequest(
			`/goals/updateGoal/${goal.goalId}`,
			goal,
			token
		);
		if (response.error) {
			dispatch(goalFailure(response.error));
		} else {
			dispatch(updateGoalSuccess(response.result));
		}
	} catch (error) {
		dispatch(goalFailure(error.message));
	}
};
export const deleteGoal = (goalId) => async (dispatch) => {
	const token = getItem("token");
	try {
		const response = await deleteRequest(`/goals/deleteGoal/${goalId}`, token);
		if (response.error) {
			dispatch(goalFailure(response.error));
		} else {
			dispatch(deleteGoalSuccess({ goalId }));
		}
	} catch (error) {
		dispatch(goalFailure(error.message));
	}
};
export const {
	startLoading,
	stopLoading,
	setGoals,
	createGoalSuccess,
	goalFailure,
	updateGoalSuccess,
	deleteGoalSuccess,
} = goalSlice.actions;

export default goalSlice.reducer;
