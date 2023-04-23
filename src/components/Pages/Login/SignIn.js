import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import mcApp from "../../app/app.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	loginUser,
	selectError,
	selectIsAuthenticated,
} from "../../../redux/reducers/auth.slice";

const SignIn = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const error = useSelector(selectError);
	const navigate = useNavigate();
	const isAuthenticated = useSelector(selectIsAuthenticated);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(loginUser(email, password));
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/HomeConnected");
		} else {
			console.log("Pas d'utilisateur connecté");
		}
		if (error) {
			setErrorMessage("Email ou mot de passe incorrect");
		} else {
			setErrorMessage("");
		}
	}, [isAuthenticated, navigate, error]);
	return (
		<div>
			<Header />
			<main>
				<h2>Connectez-vous pour accéder à votre compte</h2>
				<form
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
					onSubmit={(e) => handleSubmit(e)}
				>
					<fieldset className={`${mcApp.p1} ${mcApp.m1}`}>
						<legend>Adresse email</legend>
						<input
							type="email"
							value={email}
							name="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</fieldset>

					<fieldset className={`${mcApp.p1} ${mcApp.m1}`}>
						<legend>Mot de passe</legend>
						<input
							type="password"
							value={password}
							name="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</fieldset>

					<button type="submit">Se connecter</button>
					{errorMessage && (
						<div>
							<p className={mcApp.errorMessage}>{errorMessage}</p>
						</div>
					)}
				</form>
				<h3>Vous n'avez pas encore de compte ?</h3>
				<div className={mcApp.tAC}>
					<Link to="/SignUp">
						<button>S'inscrire</button>
					</Link>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default SignIn;
