import { Navigate, Route, Routes } from "react-router-dom";
import Contact from "../Pages/Contact/Contact";
import Home from "../Pages/Home/Home";
import HomeConnected from "../Pages/Home/HomeConnected";
import HomeLogin from "../Pages/Login/HomeLogin";
import Profil from "../Pages/Profil/Profil";
import SignIn from "../Pages/Login/SignIn";
import SignUp from "../Pages/Login/SignUp";
import ConfidentialityPolicies from "../Pages/Reglementation/ConfidentialityPolicies";
import LegalMentions from "../Pages/Reglementation/LegalMentions";
import UsingConditions from "../Pages/Reglementation/UsingConditions";
import mc from "./app.module.scss";
import Expense from "../Pages/Expense/Expense";
import Goal from "../Pages/Goal/Goal";
import AnalyzeExpenses from "../Pages/Analysis/AnalyzeExpenses";
import AnalyzeGoals from "../Pages/Analysis/AnalyzeGoals";
const App = () => {
	return (
		<div className={mc.container}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/*" element={<Navigate to="/" />} />
				<Route path="/HomeConnected" element={<HomeConnected />} />
				<Route path="/Help" element={<Contact />} />
				<Route path="/Login" element={<HomeLogin />} />
				<Route path="/Profil" element={<Profil />} />
				<Route path="/SignIn" element={<SignIn />} />
				<Route path="/SignUp" element={<SignUp />} />
				<Route path="/Expenses" element={<Expense />} />
				<Route path="/Goals" element={<Goal />} />
				<Route
					path="/ConfidentialityPolicies"
					element={<ConfidentialityPolicies />}
				/>
				<Route path="/LegalMentions" element={<LegalMentions />} />
				<Route path="/UsingConditions" element={<UsingConditions />} />
				<Route path="/AnalyzeExpenses" element={<AnalyzeExpenses />} />
				<Route path="/AnalyzeGoals" element={<AnalyzeGoals />} />
			</Routes>
		</div>
	);
};

export default App;
