import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import mc from "./home.module.scss";
import mcApp from "../../app/app.module.scss";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import banner from "../../../media/images/Home/banner.jpg";
import expense from "../../../media/images/Home/expense.png";
import purpose from "../../../media/images/Home/objective.png";
import savings from "../../../media/images/Home/savings.png";
import analyzeExpense from "../../../media/images/Home/analyzeExpense.png";

import {
	selectIsAuthenticated,
	initAuth,
} from "../../../redux/reducers/auth.slice";
import { Link } from "react-router-dom";
const HomeConnected = ({ user }) => {
	const dispatch = useDispatch();
	const userSelected = useSelector((store) => store.auth.auth.user);
	const isAuthenticated = useSelector(selectIsAuthenticated);

	useEffect(() => {
		dispatch(initAuth());
	}, [dispatch]);

	return (
		<div>
			<Header />
			<main>
				<img
					className={`${mc.banner} ${mcApp.w100}`}
					src={banner}
					alt="Bannière du site"
				/>
				{isAuthenticated ? (
					<div>
						<h1>
							Bienvenue <span className={mc.pseudo}>{userSelected.pseudo}</span>{" "}
							sur <span className={mc.pseudo}>COST</span>, votre site de gestion
							de dépenses personnelles et d'objectifs financiers.
						</h1>

						<div
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCSA} ${mcApp.fWW}`}
						>
							<article className={mc.homeArticle}>
								<Link
									to="/Expenses"
									className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
								>
									<h3>Entrer une dépense</h3>
									<img
										className={mc.articleImg}
										src={expense}
										alt="Image représentant une dépense"
									/>
								</Link>
							</article>
							<article className={mc.homeArticle}>
								<Link
									to="/Goals"
									className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
								>
									<h3>Définir un objectif</h3>

									<img
										className={mc.articleImg}
										src={purpose}
										alt="Image représentant un objectif"
									/>
								</Link>
							</article>
							<article className={mc.homeArticle}>
								<Link
									to="/AnalyzeExpenses"
									className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
								>
									<h3>Analyser vos dépenses</h3>

									<img
										className={mc.articleImg}
										src={analyzeExpense}
										alt="Image représentant l'analyse des dépenses"
									/>
								</Link>
							</article>
							<article className={mc.homeArticle}>
								<Link
									to="/AnalyzeGoals"
									className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
								>
									<h3>Analyser vos objectifs</h3>

									<img
										className={mc.articleImg}
										src={savings}
										alt="Image représentant l'analyse des objectifs"
									/>
								</Link>
							</article>
						</div>
					</div>
				) : (
					<p>
						Vous êtes déconnecté. Veuillez vous connecter pour accéder à votre
						compte.
					</p>
				)}
			</main>
			<Footer />
		</div>
	);
};

export default HomeConnected;
