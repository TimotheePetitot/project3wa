import React from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import mcApp from "../../app/app.module.scss";
import mc from "../Home/home.module.scss";

import { Link } from "react-router-dom";
const HomeLogin = () => {
	return (
		<div>
			<Header />
			<main>
				<h2>Vous n'etes pas connectez </h2>
				<div className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCSA} ${mcApp.fWW}`}>
					<article className={mc.homeArticle}>
						<Link to="/SignIn">
							<h3>S'indentifier</h3>
							<p>Identification</p>
						</Link>
					</article>
					<article className={mc.homeArticle}>
						<Link to="/SignUp">
							<h3>S'inscrire</h3>
							<p>Inscription</p>
						</Link>
					</article>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default HomeLogin;
