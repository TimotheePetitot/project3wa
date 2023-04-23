import { getRequest, postRequestNoToken } from "../../api/api";
import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../utils/storage.utils";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		users: [],
		loading: false,
	},
	reducers: {
		startLoading: (state) => {
			return { ...state, loading: true };
		},
		stopLoading: (state) => {
			return { ...state, loading: false };
		},
		setUsers: (state, action) => {
			return {
				...state,
				loading: false,
				users: [...action.payload.users],
			};
		},
		createUserSuccess: (state, action) => {
			const { key, value } = action.payload;
			return { ...state, [key]: value };
		},
		userFailure: (state, action) => {
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		},
	},
});

export const createNewUser = (userData) => async (dispatch) => {
	try {
		const response = await postRequestNoToken("/users/sign-up", userData);
		if (response.error) {
			dispatch(userFailure(response.error));
		} else {
			dispatch(createUserSuccess(response.result));
		}
	} catch (error) {
		dispatch(userFailure(error.message));
	}
};

export const getUsers = (users) => async (dispatch, getState) => {
	const loading = getState().user.loading;
	const token = getItem("token");
	if (loading) return;
	dispatch(startLoading());
	const { status, result, error } = await getRequest(
		"/users/readAllUsers",
		token,
		users
	);
	dispatch(setUsers({ users: result.users }));
};

export const getOneUser = (userId) => async (dispatch, getState) => {
	const loading = getState().user.loading;
	if (loading) return;
	dispatch(startLoading());
	const { status, result, error } = await getRequest(
		`/users/readUser/${userId}`
	);
	dispatch(setUsers({ users: [result.user] }));
};

export const contact = (userData) => async (dispatch) => {
	try {
		const response = await postRequestNoToken("/users/contact", userData);
		if (response.error) {
			dispatch(userFailure(response.error));
		} else {
			console.log(response.result);
		}
	} catch (error) {
		dispatch(userFailure(error.message));
	}
};
export const {
	startLoading,
	stopLoading,
	setUsers,
	createUserSuccess,
	userFailure,
} = userSlice.actions;
export default userSlice.reducer;
