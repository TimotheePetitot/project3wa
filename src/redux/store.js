import user from "./reducers/user.slice";
import auth from "./reducers/auth.slice";
import expense from "./reducers/expense.slice";
import goal from "./reducers/goal.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		user,
		auth,
		expense,
		goal,
	},
});
