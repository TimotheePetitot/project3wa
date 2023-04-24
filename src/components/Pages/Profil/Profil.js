import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

import mcApp from "../../app/app.module.scss";
import mc from "./profil.module.scss";
import mcform from "../../Pages/Login/form.module.scss";

import avatar1 from "../../../media/images/Avatar/avatar1.png";
import avatar2 from "../../../media/images/Avatar/avatar2.png";
import avatar3 from "../../../media/images/Avatar/avatar3.png";
import avatar4 from "../../../media/images/Avatar/avatar4.png";
import avatar5 from "../../../media/images/Avatar/avatar5.png";
import banner from "../../../media/images/Banner/smallBanner1.jpg";
import {
	logoutUser,
	selectIsAuthenticated,
	updateCurrentUser,
	initAuth,
	deleteUser,
} from "../../../redux/reducers/auth.slice";
import { useDispatch, useSelector } from "react-redux";

const Profil = () => {
	const dispatch = useDispatch();

	// donner utilisateur connecté
	const userSelected = useSelector((store) => store.auth.auth.user);
	const isAuthenticated = useSelector(selectIsAuthenticated);

	// déconnexion
	const handleLogout = () => {
		dispatch(logoutUser());
	};

	// update
	const [newAvatar, setNewAvatar] = useState("");
	const [newPseudo, setNewPseudo] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [newLastname, setNewLastname] = useState("");
	const [newFirstname, setNewFirstname] = useState("");
	const [newSalary, setNewSalary] = useState();
	const [newSavings, setNewSavings] = useState();

	const handleSubmit = async (e) => {
		// e.preventDefault();
		const userId = userSelected.id;

		const formData = new FormData();
		formData.append("avatar", newAvatar);
		const user_img =
			newAvatar === "" ? userSelected.user_img : formData.get("avatar");
		const pseudo = newPseudo === "" ? userSelected.pseudo : newPseudo;
		const email = newEmail === "" ? userSelected.email : newEmail;
		const lastname = newLastname === "" ? userSelected.lastname : newLastname;
		const firstname =
			newFirstname === "" ? userSelected.firstname : newFirstname;
		const salary = newSalary === null ? userSelected.salary : newSalary;
		const user_saving =
			newSavings === null ? userSelected.user_saving : newSavings;

		await dispatch(
			updateCurrentUser({
				userId,
				user_img,
				pseudo: pseudo,
				email: email,
				lastname: lastname,
				firstname: firstname,
				salary: salary,
				user_saving: user_saving,
			})
		);
		handleAvatarSelect(e);
	};

	//gestion img
	const handleAvatarSelect = (e) => {
		setNewAvatar(e.target.value);
	};

	// rechargement de page

	useEffect(() => {
		dispatch(initAuth());
	}, [dispatch]);

	//suppression du user
	const [isDeleted, setIsDeleted] = useState(false);
	const handleDeleteUser = () => {
		dispatch(deleteUser(userSelected.id));
		setIsDeleted(true);
	};

	//cacher le texte
	const [avatarClass, setAvatarClass] = useState(mc.hidden);
	const [pseudoClass, setPseudoClass] = useState(mc.hidden);
	const [emailClass, setEmailClass] = useState(mc.hidden);
	const [lastnameClass, setLastnameClass] = useState(mc.hidden);
	const [firstnameClass, setFirstnameClass] = useState(mc.hidden);
	const [salaryClass, setSalaryClass] = useState(mc.hidden);
	const [savingClass, setSavingClass] = useState(mc.hidden);
	function handleAvatarClass() {
		setAvatarClass((prevClass) => (prevClass === mc.hidden ? "" : mc.hidden));
	}
	function handlePseudoClass() {
		setPseudoClass((prevClass) => (prevClass === mc.hidden ? "" : mc.hidden));
	}
	function handleEmailClass() {
		setEmailClass((prevClass) => (prevClass === mc.hidden ? "" : mc.hidden));
	}
	function handleLastnameClass() {
		setLastnameClass((prevClass) => (prevClass === mc.hidden ? "" : mc.hidden));
	}
	function handleFirstnameClass() {
		setFirstnameClass((prevClass) =>
			prevClass === mc.hidden ? "" : mc.hidden
		);
	}
	function handleSalaryClass() {
		setSalaryClass((prevClass) => (prevClass === mc.hidden ? "" : mc.hidden));
	}
	function handleSavingClass() {
		setSavingClass((prevClass) => (prevClass === mc.hidden ? "" : mc.hidden));
	}

	return (
		<div>
			<Header />
			<main>
				<h2>Mon profil</h2>
				{isAuthenticated ? (
					<div
						className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mcApp.w100}`}
					>
						<article
							className={`${mc.card} ${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
						>
							<img
								src={process.env.PUBLIC_URL + userSelected.user_img}
								alt="Image de l'utilisateur"
								className={mc.mainAvatarImg}
							/>
							<button onClick={handleAvatarClass}>Changer</button>

							<form
								className={avatarClass}
								onSubmit={(e) => handleSubmit(e, "user_img", newAvatar)}
							>
								<div
									className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCSA} ${mcApp.fWW} ${mc.avatarContainer}`}
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
											htmlFor={`avatar ${value}`}
											key={value}
											className={newAvatar === value ? mcform.select : ""}
										>
											<input
												id={`avatar ${value}`}
												type="radio"
												name="avatar"
												value={value}
												checked={newAvatar === value}
												accept="/Avatar/*"
												onChange={handleAvatarSelect}
											/>
											<img src={src} alt={alt} />
										</label>
									))}
								</div>
								<div className={mcApp.tAC}>
									<button type="submit">Soumettre</button>
								</div>
							</form>
						</article>
						<div
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mcApp.w100}`}
						>
							<article
								className={`${mc.card} ${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
							>
								<p>
									<strong>Pseudo : </strong>
									{userSelected.pseudo}
								</p>
								<button onClick={handlePseudoClass}>Changer</button>
								<form
									className={`${pseudoClass} ${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
									onSubmit={(e) => handleSubmit(e, "pseudo", newPseudo)}
								>
									<input
										type="text"
										placeholder="Nouveau pseudo"
										value={newPseudo}
										onChange={(e) => setNewPseudo(e.target.value)}
									/>
									<button type="submit">Soumettre</button>
								</form>
							</article>
						</div>

						<div
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mcApp.w100}`}
						>
							<article
								className={`${mc.card} ${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
							>
								<p>
									<strong>Email : </strong>
									{userSelected.email}
								</p>
								<button onClick={handleEmailClass}>Changer</button>
								<form
									className={`${emailClass} ${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
									onSubmit={(e) => handleSubmit(e, "email", newEmail)}
								>
									<input
										type="email"
										placeholder="Nouvel email"
										value={newEmail}
										onChange={(e) => setNewEmail(e.target.value)}
									/>
									<button type="submit">Soumettre</button>
								</form>
							</article>
						</div>
						<div
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mcApp.w100}`}
						>
							<article
								className={`${mc.card} ${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
							>
								<p>
									<strong>Nom de famille : </strong>
									{userSelected.lastname}
								</p>

								<button onClick={handleLastnameClass}>Changer</button>
								<form
									className={`${lastnameClass} ${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
									onSubmit={(e) => handleSubmit(e, "lastname", newLastname)}
								>
									<input
										type="text"
										placeholder="Nouveau Nom"
										value={newLastname}
										onChange={(e) => setNewLastname(e.target.value)}
									/>
									<button type="submit">Soumettre</button>
								</form>
							</article>
						</div>
						<div
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mcApp.w100}`}
						>
							<article
								className={`${mc.card} ${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
							>
								<p>
									<strong>Prénom : </strong>
									{userSelected.firstname}
								</p>

								<button onClick={handleFirstnameClass}>Changer</button>
								<form
									className={`${firstnameClass} ${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
									onSubmit={(e) => handleSubmit(e, "firstname", newFirstname)}
								>
									<input
										type="text"
										placeholder="Nouveau prénom"
										value={newFirstname}
										onChange={(e) => setNewFirstname(e.target.value)}
									/>
									<button type="submit">Soumettre</button>
								</form>
							</article>
						</div>
						<div
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mcApp.w100}`}
						>
							<article
								className={`${mc.card} ${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
							>
								<p>
									<strong>Salaire par mois : </strong>
									{userSelected.salary}€
								</p>
								<button onClick={handleSalaryClass}>Changer</button>
								<form
									className={`${salaryClass} ${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
									onSubmit={(e) => handleSubmit(e, "salary", newSalary)}
								>
									<input
										type="text"
										placeholder="Nouveau Salaire"
										value={newSalary}
										onChange={(e) => setNewSalary(e.target.value)}
									/>
									<button type="submit">Soumettre</button>
								</form>
							</article>
						</div>
						<div
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mcApp.w100}`}
						>
							<article
								className={`${mc.card} ${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
							>
								<p>
									<strong>Epargne mensuelle : </strong>
									{userSelected.user_saving}€
								</p>
								<button onClick={handleSavingClass}>Changer</button>
								<form
									className={`${savingClass} ${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
									onSubmit={(e) => handleSubmit(e, "user_saving", newSavings)}
								>
									<input
										type="text"
										placeholder="Nouvelle épargne"
										value={newSavings}
										onChange={(e) => setNewSavings(e.target.value)}
									/>
									<button type="submit">Soumettre</button>
								</form>
							</article>
						</div>
						<button onClick={handleLogout}>Déconnexion</button>
						<button className={mc.removalButton} onClick={handleDeleteUser}>
							Supprimer le compte
						</button>
						<img
							className={mcApp.w100}
							src={banner}
							alt="Image représentant une petite bannière du site"
						/>
					</div>
				) : isDeleted ? (
					<p>Votre compte a été supprimé avec succès !</p>
				) : (
					<p>Vous êtes bien déconnecté !</p>
				)}
			</main>
			<Footer />
		</div>
	);
};

export default Profil;
