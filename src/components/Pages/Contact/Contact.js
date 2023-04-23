import React, { useEffect, useRef, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import mc from "./contact.module.scss";
import mcApp from "../../app/app.module.scss";

import banner from "../../../media/images/Banner/smallBanner2.jpg";
import { initAuth } from "../../../redux/reducers/auth.slice";
import { useDispatch } from "react-redux";
import emailjs from "@emailjs/browser";

const Contact = () => {
	const dispatch = useDispatch();
	const form = useRef();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [subject, setSubject] = useState("");
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				"service_70bgjyi",
				"template_j965uw9",
				form.current,
				"nOxC6_PWriMW8WCB0"
			)
			.then(
				(result) => {
					console.log("message envoyé avec succés");
					setShowSuccessMessage(true);
					setName("");
					setEmail("");
					setMessage("");
					setSubject("");
				},
				(error) => {
					console.error("erreur lors de l'envoi de l'email");
				}
			);
	};

	// rechargement de page
	useEffect(() => {
		dispatch(initAuth());
	}, [dispatch]);
	return (
		<div>
			<Header />
			<main>
				<h2>Contactez nous pour que nous puissions vous aidez !</h2>
				{showSuccessMessage && (
					<p>
						Votre message à bien été envoyé. Nous faisons le nécessaire pour
						vous répondre et faciliter au mieux votre nagivation sur COST.
					</p>
				)}
				<form
					ref={form}
					onSubmit={sendEmail}
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mc.contactForm}`}
				>
					<label htmlFor="name">Nom :</label>
					<input
						type="text"
						id="name"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<label htmlFor="email">Email :</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label htmlFor="subject">Sujet :</label>
					<input
						type="text"
						id="subject"
						name="subject"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						required
					/>
					<label htmlFor="message">Message :</label>
					<textarea
						id="message"
						name="message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						required
					></textarea>

					<button type="submit" value="Send">
						Envoyer
					</button>
				</form>
				<h3>Suivez nous également sur les réseaux !</h3>
				<ul
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mc.contactList}`}
				>
					<li>
						<a
							href="mailto:servicecost@outlook.com?subject=Contact &body=Merci de nous avoir contacté, nous vous souhaitons une agréable journée. L'équipe COST"
							title="Lien vers la boite email"
							rel="noopener"
						>
							<i className="fa-solid fa-envelope"></i>
						</a>
					</li>
					<li>
						<a
							href="https://facebook.com"
							title="Lien vers le profil d'entreprise facebook"
							rel="noopener"
						>
							<i className="fa-brands fa-square-facebook"></i>
						</a>
					</li>
					<li>
						<a
							href="https://instagram.com"
							title="Lien vers le profil d'entreprise instagram"
							rel="noopener"
						>
							<i className="fa-brands fa-square-instagram"></i>
						</a>
					</li>
					<li>
						<a
							href="https://twitter.com"
							title="Lien vers le profil d'entreprise twitter"
							rel="noopener"
						>
							<i className="fa-brands fa-square-twitter"></i>
						</a>
					</li>
					<li>
						<a
							href="https://linkedin.com"
							title="Lien vers le profil d'entreprise LinkedIn"
							rel="noopener"
						>
							<i className="fa-brands fa-linkedin"></i>
						</a>
					</li>
				</ul>
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

export default Contact;
