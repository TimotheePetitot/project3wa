import React, { useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import mcApp from "../../app/app.module.scss";
import banner from "../../../media/images/Banner/smallBanner2.jpg";
import { initAuth } from "../../../redux/reducers/auth.slice";
import { useDispatch } from "react-redux";

const LegalMentions = () => {
	const dispatch = useDispatch();
	// rechargement de page
	useEffect(() => {
		dispatch(initAuth());
	}, [dispatch]);
	return (
		<div>
			<Header />
			<main>
				<h2>Mentions légales</h2>
				<p>
					Le présent site web est la propriété de COST, dont le siège social est
					situé à 6 Bourg de Cailleau 33750 BEYCHAC ET CAILLAU, et immatriculée
					sous le numéro ******.
				</p>
				<p>Directeur de publication : Timothée Petitot</p>
				<p>Hébergement du site : To be defined</p>
				<p>Le site web est soumis à la loi française.</p>
				<h3>Propriété intellectuelle</h3>
				<p>
					Le contenu du site web, y compris, mais sans s'y limiter, les textes,
					images, graphismes, logos, boutons, logiciels et autres éléments
					constitutifs du site web sont la propriété exclusive de COST ou de ses
					partenaires et sont protégés par les lois françaises et
					internationales sur le droit d'auteur et la propriété intellectuelle.
					Toute reproduction, distribution, modification, adaptation,
					retransmission ou publication de tout ou partie du contenu du site web
					est strictement interdite sans l'autorisation écrite préalable de
					COST.
				</p>
				<h3>Responsabilité</h3>
				<p>
					COST ne garantit pas l'exactitude, la complétude, l'adéquation ou la
					fiabilité des informations et contenus disponibles sur le site web, et
					décline toute responsabilité pour les erreurs ou omissions dans le
					contenu du site web. COST ne sera pas responsable des dommages
					directs, indirects ou consécutifs résultant de l'utilisation du site
					web ou de l'impossibilité d'utiliser le site web, y compris, mais sans
					s'y limiter, les dommages résultant de la perte de données ou de
					bénéfices, même si COST a été informé de la possibilité de tels
					dommages.
				</p>

				<h3>Liens</h3>
				<p>
					Le site web peut contenir des liens vers des sites tiers qui ne sont
					pas sous le contrôle de COST. COST n'est pas responsable du contenu de
					ces sites tiers et ne garantit pas l'exactitude, la qualité, la
					pertinence ou l'exhaustivité des informations et contenus disponibles
					sur ces sites tiers.
				</p>
				<h3>Modification des conditions d'utilisation</h3>
				<p>
					COST se réserve le droit de modifier les présentes conditions
					d'utilisation à tout moment et sans préavis. Nous vous encourageons à
					consulter régulièrement ces conditions d'utilisation pour être informé
					de tout changement.
				</p>
				<h3>Contactez-nous</h3>
				<p>
					Si vous avez des questions concernant ces mentions légales, veuillez
					nous contacter à l'adresse e-mail suivante :{" "}
					<strong>servicecost@outlook.com</strong>
				</p>
				<img
					className={mcApp.w100}
					src={banner}
					alt="Image représentant une petite bannière du site"
				/>
			</main>
			<Footer />
		</div>
	);
};

export default LegalMentions;
