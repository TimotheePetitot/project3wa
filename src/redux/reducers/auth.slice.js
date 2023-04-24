import { postRequest, putRequest, deleteRequest } from "../../api/api";
import { createSlice } from "@reduxjs/toolkit";
import { setItem, getItem, removeItem } from "../../utils/storage.utils";
const authSlice = createSlice({
	name: "auth",
	initialState: {
		auth: {
			token: null,
			user: null,
		},
		isLoading: false,
		error: null,
		loginStatus: null,
	},
	reducers: {
		loginStart: (state) => {
			state.isLoading = true;
			state.loginStatus = "pending";
			state.error = null;
		},
		loginSuccess: (state, action) => {
			state.isLoading = false;
			state.auth = {
				token: action.payload.token,
				user: action.payload.user,
			};
			state.loginStatus = "fulfilled";
			state.error = null;
			if (action.payload.token) {
				setItem("token", action.payload.token);
				// console.log("Token stored in state:", state.auth.token);
			}
		},
		loginFailure: (state, action) => {
			state.isLoading = false;
			console.log("erreur !!");
			state.auth = {
				token: null,
			};
			state.loginStatus = "rejected";
			state.error = action.payload;
		},
		logoutUser: (state) => {
			state.auth = {
				token: null,
			};
			removeItem("token");
		},
		updateUserSuccess: (state, action) => {
			state.isLoading = false;
			state.error = null;
			const { key, value } = action.payload;
			return { ...state, [key]: value };
		},
		deleteUserSuccess: (state) => {
			state.auth = {
				token: null,
				user: null,
			};
			removeItem("token");
		},
	},
});

export const loginUser = (email, password) => async (dispatch) => {
	try {
		dispatch(loginStart());

		const response = await postRequest("/users/sign-in", { email, password });
		if (response.error) {
			dispatch(loginFailure(response.error));
		} else {
			const token = response.result.token;
			setItem("token", token); // Stockage du jeton dans le stockage local
			dispatch(loginSuccess(response.result));
		}
	} catch (error) {
		dispatch(loginFailure(error.message));
	}
};

export const initAuth = () => async (dispatch) => {
	try {
		const storedToken = getItem("token");
		if (storedToken) {
			const response = await postRequest("/users/check-token", {
				token: storedToken,
			});
			if (response.error) {
				dispatch(logoutUser());
			} else {
				dispatch(loginSuccess(response.result));
			}
		}
	} catch (error) {
		console.error("Error refreshing token: ", error);
	}
};

export const updateCurrentUser = (user) => async (dispatch) => {
	try {
		const token = getItem("token");
		const response = await putRequest(
			`/users/update/${user.userId}`,
			user,
			token
		);
		if (response.error) {
			dispatch(loginFailure(response.error));
		} else {
			dispatch(updateUserSuccess(response.result));
		}
	} catch (error) {
		dispatch(loginFailure(error.message));
	}
};

export const deleteUser = (userId) => async (dispatch) => {
	try {
		const token = getItem("token");
		const response = await deleteRequest(`/users/delete/${userId}`, token);
		if (response.error) {
			console.log("Error deleting user:", response.error);
		} else {
			console.log("User deleted successfully!");
			dispatch(deleteUserSuccess(response.result));
		}
	} catch (error) {
		console.log("Error deleting user:", error.message);
	}
};

export const selectUser = (state) => state.auth.auth.user;

export const selectError = (state) => state.auth.error;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsAuthenticated = (state) => {
	return !!state.auth.auth.token;
};

export const selectLoginStatus = (state) => state.auth.loginStatus;

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	loginStatus,
	logoutUser,
	updateUserSuccess,
	deleteUserSuccess,
} = authSlice.actions;

export default authSlice.reducer;
