import React from "react";
import { NavLink } from "react-router-dom";
import mc from "../Header/headerfooter.module.scss";
import mcNav from "../Nav/nav.module.scss";
import mcApp from "../app/app.module.scss";
import logo from "../../media/images/Logo/logo.png";
const footer = () => {
	return (
		<footer
			className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
		>
			<div>
				<ul className={`${mcApp.m0} ${mcApp.p2}`}>
					<li>
						<NavLink
							to={"/ConfidentialityPolicies"}
							className={(footer) => (footer.isActive ? mcNav["active"] : "")}
						>
							Politiques de confidentialité
						</NavLink>
					</li>
					<li>
						<NavLink
							to={"/LegalMentions"}
							className={(footer) => (footer.isActive ? mcNav["active"] : "")}
						>
							Mentions légales
						</NavLink>
					</li>
					<li>
						<NavLink
							to={"/UsingConditions"}
							className={(footer) => (footer.isActive ? mcNav["active"] : "")}
						>
							Conditions d'Utilisation
						</NavLink>
					</li>
				</ul>
			</div>
			<img
				src={logo}
				alt="Logo du site"
				className={`${mcApp.p2} ${mcApp.dB}`}
			/>
		</footer>
	);
};

export default footer;
