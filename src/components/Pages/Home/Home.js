import React from "react";

import mc from "./home.module.scss";
import mcApp from "../../app/app.module.scss";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import banner from "../../../media/images/Home/banner.jpg";
import expense from "../../../media/images/Home/expense.png";
import purpose from "../../../media/images/Home/objective.png";
import savings from "../../../media/images/Home/savings.png";
import analyzeExpense from "../../../media/images/Home/analyzeExpense.png";

import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<Header />
			<main>
				<img
					className={`${mc.banner} ${mcApp.w100}`}
					src={banner}
					alt="Bannière du site"
				/>

				<h1>
					Bienvenue sur
					<span className={mc.pseudo}> COST</span>, votre site de gestion de
					dépenses personnelles et d'objectifs financiers.
				</h1>
				<p>
					Nous savons qu'il est difficile de gérer ses finances, que ce soit
					pour un voyage, une colocation ou encore un projet commun. C'est
					pourquoi nous avons créé une plateforme simple et intuitive pour vous
					aider à suivre vos dépenses et à atteindre vos objectifs financiers
					que vous vous êtes fixés.
				</p>
				<p>
					Notre site vous permet de créer des budgets pour chaque projet, et de
					les partager avec d'autres membres de votre famille, vos amis ou votre
					groupe. Vous pouvez également facilement ajouter vos dépenses
					personnelles et suivre votre progression en temps réel.
				</p>
				<p>
					Nous sommes convaincus que notre site vous aidera à prendre le
					contrôle de vos finances. Notre site de gestion des dépenses vous
					facilitera la vie.
				</p>

				<div className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCSA} ${mcApp.fWW}`}>
					<article className={mc.homeArticle}>
						<Link
							to="/Login"
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
						>
							<h3>Entrer une dépense</h3>

							<img
								className={`${mc.articleImg} ${mcApp.dB}`}
								src={expense}
								alt="Image représentant une dépense"
							/>
						</Link>
					</article>
					<article className={mc.homeArticle}>
						<Link
							to="/Login"
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
							to="/Login"
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
							to="/Login"
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
				<p>
					Inscrivez-vous dès maintenant pour commencer à gérer vos dépenses et à
					atteindre vos objectifs
				</p>
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

export default Home;
