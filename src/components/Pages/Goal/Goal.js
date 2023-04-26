//import components
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

//Hook
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//CSS
import mcApp from "../../app/app.module.scss";
import mc from "./goal.module.scss";
import mcform from "../../Pages/Login/form.module.scss";

//image
import Type1 from "../../../media/images/GoalType/Alimentation.png";
import Type2 from "../../../media/images/GoalType/Transport.png";
import Type3 from "../../../media/images/GoalType/Logement.png";
import Type4 from "../../../media/images/GoalType/Loisir.png";
import Type5 from "../../../media/images/GoalType/Travail.png";
import Type6 from "../../../media/images/GoalType/Sante.png";
import Type7 from "../../../media/images/GoalType/Autre.png";

//Redux
import { createNewGoal } from "../../../redux/reducers/goal.slice";
import { getUsers } from "../../../redux/reducers/user.slice";
import {
	selectIsAuthenticated,
	initAuth,
} from "../../../redux/reducers/auth.slice";

//Library moment
import moment from "moment";

const Goal = () => {
	//Redux Affichage users
	const { users, loading } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers());
	}, []);
	//Redux user connecté
	const isAuthenticated = useSelector(selectIsAuthenticated);
	useEffect(() => {
		dispatch(initAuth());
	}, [dispatch]);

	//Déclaration de constantes globales du form
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [totalAmount, setTotalAmount] = useState(0);
	const [savingAmount, setSavingAmount] = useState(0);
	const [frequencyAmount, setFrequencyAmount] = useState(0);
	const [selectedFrequency, setSelectedFrequency] = useState("");

	//Déclaration de constantes recherche d'un user
	const [searchQuery, setSearchQuery] = useState("");
	const [participants, setParticipants] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);

	//Déclaration de constantes calcul endDate
	const today = new Date().toLocaleDateString("fr-CA");
	const [startDate, setStartDate] = useState(today);
	const [endDate, setEndDate] = useState("");
	const [frequency, setFrequency] = useState(0);

	//Déclaration de constantes pour l'affichage de messages
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isFormComplete, setIsFormComplete] = useState(false);

	//Fonction pour la selection d'un user
	const handleUserSelection = (user) => {
		if (!participants.some((participant) => participant.id === user.id)) {
			setParticipants([...participants, user]);
			setSelectedUsers([...selectedUsers, user.id]);
		} else {
			setParticipants(participants.filter((p) => p.id !== user.id));
			setSelectedUsers(selectedUsers.filter((id) => id !== user.id));
		}
	};

	//Redux Hook useEffect pour l'affichage des erreurs de remplissages pour la date
	useEffect(() => {
		if (frequencyAmount && totalAmount) {
			setIsFormComplete(true);
		} else {
			setIsFormComplete(false);
		}
	}, [frequencyAmount, totalAmount, selectedFrequency]);

	// Fonction pour gérer la sélection du nombre de la fréquence pour le calcul de la date de fin
	function handleFrequencyChange(event) {
		const selectedFrequency = event.target.value;
		setSelectedFrequency(selectedFrequency);
		if (selectedFrequency === "hebdomadaire") {
			setFrequency(7);
		} else if (selectedFrequency === "mensuel") {
			setFrequency(30);
		} else if (selectedFrequency === "annuel") {
			setFrequency(365);
		}
	}
	//Fonction calcul date de fin
	function calculateEndDate(e) {
		const remainingAmount = totalAmount - savingAmount;
		const daysLeft =
			(Math.ceil(remainingAmount / frequencyAmount) * frequency) /
			selectedUsers.length;
		// Check que startDate est une date valide en utilisant le package 'npm install moment'
		const isValidDate = moment(startDate, "YYYY-MM-DD", true).isValid();

		//if permettant la gestion des erreurs pour le calcul de la date de fin
		if (
			isValidDate &&
			frequencyAmount !== "" &&
			totalAmount !== "" &&
			selectedFrequency !== ""
		) {
			const newEndDate = moment(startDate)
				.add(daysLeft, "days")
				.format("YYYY-MM-DD");
			setEndDate(newEndDate);
		} else {
			const missingField = !isValidDate
				? "une date de début valide"
				: !frequencyAmount
				? "le montant de la fréquence choisie"
				: !totalAmount
				? "le montant total"
				: !selectedFrequency
				? "la périodicité"
				: "un champ requis";
			setErrorMessage(
				`Erreur lors du calcul de la date de fin d'objectif. Veuillez remplir ${missingField}.`
			);
		}
	}

	//gestion des class des Types
	const [selectedType, setSelectedType] = useState("");
	const handleSelectType = (e) => {
		setSelectedType(e.target.value);
	};

	//gestion des class des Avatars
	const [selectedMiniAvatar, setSelectedMiniAvatar] = useState("");
	const handleSelectMiniAvatar = (e) => {
		setSelectedMiniAvatar(e.target.value);
	};

	//fonction de soumission du form
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("type", selectedType);
		formData.get("type");
		await dispatch(
			createNewGoal({
				name,
				description,
				userIds: selectedUsers,
				total_amount: totalAmount,
				saving_amount: savingAmount,
				amount_by_frequency: frequencyAmount,
				start_date: startDate,
				end_date: endDate,
				type: selectedType,
				frequency: selectedFrequency,
			})
		);

		setShowSuccessMessage(true);
	};
	return (
		<div>
			<Header />
			<main>
				{isAuthenticated ? (
					<div>
						<h2>Programmer un objectif d'épargne </h2>

						<form
							onSubmit={(e) => handleSubmit(e)}
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mcApp.w100} ${mc.goalContainer}`}
						>
							<fieldset>
								<legend>Nom</legend>
								<input
									type="text"
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</fieldset>
							<fieldset>
								<legend>Description</legend>
								<input
									type="text"
									name="description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									required
								/>
							</fieldset>
							<fieldset>
								<legend>Entrer les participants</legend>
								<input
									type="search"
									placeholder="Rechercher le pseudo d'un utilisateur..."
									name="participants"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								{loading ? (
									<p>Chargement des users...</p>
								) : (
									<ul
										className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCSA} ${mcApp.fWW} ${mc.miniAvatarContainer}`}
									>
										{users &&
											users
												.filter((user) =>
													user.pseudo
														.toLowerCase()
														.includes(searchQuery.toLowerCase())
												)
												.map((user) => (
													<li key={user.id}>
														<label htmlFor={`userImg ${user.pseudo}`}>
															<input
																id={`userImg ${user.pseudo}`}
																type="checkbox"
																src={process.env.PUBLIC_URL + user.user_img}
																checked={selectedUsers.includes(user.id)}
																onChange={() => handleUserSelection(user)}
																onClick={handleSelectMiniAvatar}
															/>
															<img
																className={`${
																	selectedUsers.includes(user.id)
																		? mc.selectMiniAvatar
																		: ""
																} ${mc.miniAvatar}`}
																src={process.env.PUBLIC_URL + user.user_img}
																alt={`avatar de ${user.pseudo}`}
															/>
															<p>{user.pseudo}</p>
														</label>
													</li>
												))}
									</ul>
								)}
								{participants.length > 0 ? (
									<ul>
										<li>Participants sélectionnés :</li>
										{participants.map((participant) => (
											<li key={participant.id}>{participant.pseudo}</li>
										))}
									</ul>
								) : (
									<p>Participants sélectionnés : Aucun</p>
								)}
							</fieldset>
							<fieldset>
								<legend>Type</legend>
								<div
									className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCSA} ${mcApp.fWW} ${mc.typeContainer}`}
								>
									{[
										{
											value: "/GoalType/Alimentation.png",
											alt: "Image du type 1",
											src: Type1,
										},
										{
											value: "/GoalType/Transport.png",
											alt: "Image du type 2",
											src: Type2,
										},
										{
											value: "/GoalType/Logement.png",
											alt: "Image du type 3",
											src: Type3,
										},
										{
											value: "/GoalType/Loisir.png",
											alt: "Image du type 4",
											src: Type4,
										},
										{
											value: "/GoalType/Travail.png",
											alt: "Image du type 5",
											src: Type5,
										},
										{
											value: "/GoalType/Sante.png",
											alt: "Image du type 6",
											src: Type6,
										},
										{
											value: "/GoalType/Autre.png",
											alt: "Image du type 7",
											src: Type7,
										},
									].map(({ value, alt, src }) => (
										<label
											htmlFor={`typeImage ${value}`}
											key={value}
											className={
												selectedType === value ? mcform.selectType : ""
											}
										>
											<input
												id={`typeImage ${value}`}
												type="radio"
												name="typeImage"
												value={value}
												checked={selectedType === value}
												onChange={handleSelectType}
											/>
											<img src={src} alt={alt} />
										</label>
									))}
								</div>
							</fieldset>
							<fieldset>
								<legend>Objectif du groupe (€)</legend>
								<input
									type="number"
									name="totalAmount"
									value={totalAmount}
									onChange={(e) => setTotalAmount(e.target.value)}
									required
								/>
							</fieldset>
							<fieldset>
								<legend>Montant du groupe déjà accumulé(€)</legend>
								<input
									type="number"
									name="savingAmount"
									value={savingAmount}
									onChange={(e) => setSavingAmount(e.target.value)}
								/>
							</fieldset>
							<fieldset>
								<legend>
									Montant personnel par fréquence {selectedFrequency} (€)
								</legend>
								<input
									type="number"
									name="frequencyAmount"
									value={frequencyAmount}
									onChange={(e) => setFrequencyAmount(e.target.value)}
									required
								/>
							</fieldset>
							<fieldset>
								<legend>Frequence</legend>
								<select
									value={selectedFrequency}
									onChange={handleFrequencyChange}
									required
								>
									<option value="">Sélectionnez la fréquence</option>
									<option value="hebdomadaire">Hebdomadaire</option>
									<option value="mensuel">Mensuel</option>
									<option value="annuel">Annuel</option>
								</select>
							</fieldset>
							<fieldset>
								<legend>Date de début</legend>
								<input
									type="date"
									name="startDate"
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
									required
								/>
							</fieldset>
							<fieldset>
								<legend>Date de fin</legend>
								<div
									className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCSA} ${mcApp.fWW} ${mc.objective}`}
								>
									<button type="button" onClick={calculateEndDate}>
										Modifier
									</button>
									<input
										type="date"
										name="endDate"
										value={endDate}
										readOnly
										required
									/>
								</div>

								{errorMessage && !isFormComplete && (
									<p className={mc.errorMessage}>{errorMessage}</p>
								)}
							</fieldset>
							<button type="submit" className={mcform.submitButton}>
								Ajouter
							</button>
							{showSuccessMessage && (
								<p>
									Votre objectif d'épargne a bien été créé. Veuillez vous rentre
									dans la partie "Analyser vos objectifs" pour l'examiner de
									nouveau.
								</p>
							)}
						</form>
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

export default Goal;
