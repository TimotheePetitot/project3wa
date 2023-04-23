import React, { useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

import mcApp from "../../app/app.module.scss";
import mcform from "./form.module.scss";

import avatar1 from "../../../media/images/Avatar/avatar1.png";
import avatar2 from "../../../media/images/Avatar/avatar2.png";
import avatar3 from "../../../media/images/Avatar/avatar3.png";
import avatar4 from "../../../media/images/Avatar/avatar4.png";
import avatar5 from "../../../media/images/Avatar/avatar5.png";
import { useDispatch } from "react-redux";
import { createNewUser } from "../../../redux/reducers/user.slice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const dispatch = useDispatch();
	const [lastname, setLastname] = useState("");
	const [firstname, setFirstname] = useState("");
	const [pseudo, setPseudo] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [salary, setSalary] = useState(0);
	const [userSaving, setUserSaving] = useState(0);
	const [selectedAvatar, setSelectedAvatar] = useState("");
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const navigate = useNavigate();

	//gestion des class des avatars
	const handleAvatarSelect = (e) => {
		setSelectedAvatar(e.target.value);
	};

	//soumission du form
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("user_img", selectedAvatar);
		formData.get("user_img");
		await dispatch(
			createNewUser({
				lastname,
				firstname,
				pseudo,
				email,
				password,
				salary,
				user_saving: userSaving,
				user_img: selectedAvatar,
			})
		);

		setShowSuccessMessage(true);
		setTimeout(() => {
			navigate("/Signin");
		}, 3000);
	};

	return (
		<div>
			<Header />
			<main>
				<h2>Inscrivez-vous pour accéder à votre compte</h2>

				<form
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
					onSubmit={(e) => handleSubmit(e)}
				>
					<fieldset className={`${mcApp.p1} ${mcApp.m1}`}>
						<legend>Avatar</legend>
						<div
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCSA} ${mcApp.fWW}`}
						>
							{[
								{
									value: "/Avatar/avatar1.png",
									alt: "Image de l'avatar 1",
									src: avatar1,
								},
								{
									value: "/Avatar/avatar2.png",
									alt: "Image de l'avatar 2",
									src: avatar2,
								},
								{
									value: "/Avatar/avatar3.png",
									alt: "Image de l'avatar 3",
									src: avatar3,
								},
								{
									value: "/Avatar/avatar4.png",
									alt: "Image de l'avatar 4",
									src: avatar4,
								},
								{
									value: "/Avatar/avatar5.png",
									alt: "Image de l'avatar 5",
									src: avatar5,
								},
							].map(({ value, alt, src }) => (
								<label
									key={value}
									className={selectedAvatar === value ? mcform.select : ""}
								>
									<input
										type="radio"
										name="profileImage"
										value={value}
										checked={selectedAvatar === value}
										onChange={handleAvatarSelect}
										required
									/>
									<img src={src} alt={alt} />
								</label>
							))}
						</div>
					</fieldset>
					<fieldset className={`${mcApp.p2} ${mcApp.m3}`}>
						<legend>Nom</legend>
						<input
							type="text"
							name="lastname"
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
							required
						/>
					</fieldset>

					<fieldset className={`${mcApp.p2} ${mcApp.m3}`}>
						<legend>Prénom</legend>
						<input
							type="text"
							name="firstname"
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
							required
						/>
					</fieldset>

					<fieldset className={`${mcApp.p2} ${mcApp.m3}`}>
						<legend>Pseudo</legend>
						<input
							type="text"
							name="pseudo"
							value={pseudo}
							onChange={(e) => setPseudo(e.target.value)}
							required
						/>
					</fieldset>

					<fieldset className={`${mcApp.p2} ${mcApp.m3}`}>
						<legend>Adresse email</legend>
						<input
							type="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</fieldset>

					<fieldset className={`${mcApp.p2} ${mcApp.m3}`}>
						<legend>Mot de passe</legend>
						<input
							type="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</fieldset>

					<fieldset className={`${mcApp.p2} ${mcApp.m3}`}>
						<legend>Salaire net par mois</legend>
						<input
							type="number"
							name="salary"
							value={salary}
							onChange={(e) => setSalary(e.target.value)}
							required
						/>
					</fieldset>

					<fieldset className={`${mcApp.p2} ${mcApp.m3}`}>
						<legend>Économies net par mois</legend>
						<input
							type="number"
							name="userSaving"
							value={userSaving}
							onChange={(e) => setUserSaving(e.target.value)}
							required
						/>
					</fieldset>

					<button type="submit" className={mcform.submitButton}>
						S'inscrire
					</button>
					{showSuccessMessage && (
						<p>
							Votre compte a bien été créé. Vous allez être redirigé sur la page
							de connexion dans quelques secondes.
						</p>
					)}
				</form>
			</main>
			<Footer />
		</div>
	);
};

export default SignUp;
