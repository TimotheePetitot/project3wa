import React, { useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import mcApp from "../../app/app.module.scss";
import banner from "../../../media/images/Banner/smallBanner1.jpg";
import { initAuth } from "../../../redux/reducers/auth.slice";
import { useDispatch } from "react-redux";

const ConfidentialityPolicies = () => {
	const dispatch = useDispatch();
	// rechargement de page
	useEffect(() => {
		dispatch(initAuth());
	}, [dispatch]);
	return (
		<div>
			<Header />
			<main>
				<h2>Politiques de confidentialité</h2>
				<p>
					Nous sommes engagés à protéger la vie privée de nos utilisateurs et
					clients. Cette politique de confidentialité explique comment nous
					collectons, utilisons et protégeons les informations personnelles que
					nous recueillons auprès de vous lorsque vous utilisez notre site de
					gestion de dépenses.
				</p>
				<h3>Collecte d'informations personnelles</h3>
				<p>
					Nous collectons des informations personnelles telles que votre nom,
					votre adresse e-mail et vos informations financières lorsque vous vous
					inscrivez à notre site et utilisez nos services de gestion de
					dépenses. Nous utilisons également des cookies pour collecter des
					informations sur votre utilisation de notre site web.
				</p>
				<h3>Utilisation des informations personnelles</h3>
				<p>
					Nous utilisons les informations que nous recueillons auprès de vous
					pour vous fournir des services de gestion de dépenses personnalisés,
					pour vous informer des mises à jour et des améliorations de notre
					site, et pour vous envoyer des communications marketing par e-mail si
					vous nous avez donné votre consentement pour le faire. Nous ne
					partageons pas vos informations personnelles avec des tiers à des fins
					de marketing sans votre consentement.
				</p>
				<h3>Protection des informations personnelles</h3>
				<p>
					Nous prenons des mesures de sécurité appropriées pour protéger vos
					informations personnelles contre l'accès non autorisé, la
					modification, la divulgation ou la destruction. Nous utilisons des
					méthodes de cryptage et des technologies de sécurité pour protéger vos
					informations personnelles pendant la transmission et le stockage.
				</p>
				<h3>Accès à vos informations personnelles</h3>
				<p>
					Vous avez le droit de demander l'accès, la modification ou la
					suppression de vos informations personnelles que nous avons
					enregistrées. Si vous souhaitez exercer ce droit, veuillez nous
					contacter à l'adresse e-mail suivante :{" "}
					<strong>servicecost@outlook.com</strong>
				</p>
				<h3>Modifications de la politique de confidentialité</h3>
				<p>
					Nous nous réservons le droit de modifier cette politique de
					confidentialité à tout moment. Nous vous encourageons à consulter
					régulièrement cette politique pour être informé de tout changement.
				</p>
				<h3>Contactez-nous</h3>
				<p>
					Si vous avez des questions concernant cette politique de
					confidentialité, veuillez nous contacter à l'adresse e-mail suivante :{" "}
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

export default ConfidentialityPolicies;
