import React, { useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import mc from "../Home/home.module.scss";
import mcApp from "../../app/app.module.scss";
import banner from "../../../media/images/Banner/smallBanner1.jpg";
import { initAuth } from "../../../redux/reducers/auth.slice";
import { useDispatch } from "react-redux";

const UsingConditions = () => {
	const dispatch = useDispatch();
	// rechargement de page
	useEffect(() => {
		dispatch(initAuth());
	}, [dispatch]);
	return (
		<div>
			<Header />
			<main>
				<h2>Conditions d'utilisation</h2>

				<p>
					En utilisant notre site de gestion de dépenses, vous acceptez les
					présentes conditions d'utilisation.
				</p>
				<h3>Contenu du site</h3>
				<p>
					Le contenu de notre site web, y compris, mais sans s'y limiter, les
					textes, images, graphismes, logos, boutons, logiciels et autres
					éléments constitutifs du site web sont la propriété exclusive de COST
					ou de ses partenaires et sont protégés par les lois françaises et
					internationales sur le droit d'auteur et la propriété intellectuelle.
					Toute reproduction, distribution, modification, adaptation,
					retransmission ou publication de tout ou partie du contenu du site web
					est strictement interdite sans l'autorisation écrite préalable de
					COST.
				</p>
				<h3>Utilisation du site</h3>
				<p>
					Vous vous engagez à utiliser notre site de manière responsable et
					conforme aux lois applicables. Vous ne devez pas utiliser notre site
					pour :
				</p>
				<ul className={mc.usingList}>
					<li>
						Collecter des informations personnelles d'autres utilisateurs ou
						clients sans leur consentement préalable
					</li>
					<li>
						Diffuser des contenus illégaux, obscènes, diffamatoires, injurieux,
						menaçants ou nuisibles pour d'autres utilisateurs ou clients
					</li>
					<li>
						Utiliser des programmes automatisés pour collecter des informations
						sur notre site web
					</li>
					<li>
						Tenter de pirater ou d'accéder illégalement à notre site web ou à
						des comptes utilisateurs
					</li>
					<li>
						Utiliser notre site web d'une manière qui pourrait endommager,
						désactiver, surcharger ou altérer le fonctionnement du site web.
					</li>
				</ul>
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
				<h3>Modification des conditions d'utilisation</h3>
				<p>
					COST se réserve le droit de modifier les présentes conditions
					d'utilisation à tout moment et sans préavis. Nous vous encourageons à
					consulter régulièrement ces conditions d'utilisation pour être informé
					de tout changement.
				</p>
				<h3>Contactez-nous</h3>
				<p>
					Si vous avez des questions concernant ces conditions d'utilisation,
					veuillez nous contacter à l'adresse e-mail suivante :{" "}
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

export default UsingConditions;
