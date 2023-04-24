import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

import mcApp from "../../app/app.module.scss";
import mc from "../../Pages/Analysis/analyze.module.scss";

import ModalGoal from "./ModalGoal";
import {
	initAuth,
	selectIsAuthenticated,
} from "../../../redux/reducers/auth.slice";
import { getGoals, deleteGoal } from "../../../redux/reducers/goal.slice";
import { useDispatch, useSelector } from "react-redux";

const AnalyzeGoals = () => {
	const dispatch = useDispatch();
	const { goals, loading } = useSelector((store) => store.goal);
	const { user } = useSelector((store) => store.auth.auth);
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const [goalsSelected, setGoalsSelected] = useState([]);
	const [goalModal, setGoalModal] = useState([]);

	//filter Goals user
	useEffect(() => {
		if (goals && user) {
			const userGoals = goals.filter((goal) => {
				const participantIds = goal.Users.map((user) => user.id);
				return participantIds.includes(user.id) && goal.author_id !== user.id;
			});
			const authorGoals = goals.filter((goal) => {
				return goal.author_id === user.id;
			});
			const goalsSelected = [...userGoals, ...authorGoals];
			setGoalsSelected(goalsSelected);
		}
	}, [goals, user]);
	// recupération des données Goals
	useEffect(() => {
		dispatch(getGoals());
	}, [dispatch]);

	//ouverture/fermeture modal
	const [showModal, setShowModal] = useState(false);
	const handleOpenModal = (id) => {
		setGoalModal(goalsSelected.find((goal) => goal.id === id));
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setGoalModal([]);
	};
	// rechargement de page
	useEffect(() => {
		dispatch(initAuth());
	}, [dispatch]);
	return (
		<div>
			<Header />
			<main>
				<h2>Analyser vos objectifs</h2>
				{isAuthenticated ? (
					<div>
						<table>
							<thead>
								<tr>
									<th>Nom</th>
									<th>type</th>
									<th>Fréquence</th>
									<th>Mise</th>
									<th>Cumulé</th>
									<th>Objectif</th>
									<th>Avancement</th>
									<th>Participant(s)</th>
									<th>Statut</th>
									<th>Date de début</th>
									<th>Date de fin</th>
									<th>Gérer</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<tr>
										<td>Chargement des dépenses...</td>
									</tr>
								) : (
									goalsSelected.map((goalSelected, index) => (
										<tr key={index}>
											<td data-label="Nom">{goalSelected.name}</td>
											<td data-label="Type">
												{goalSelected.type.slice(
													goalSelected.type.lastIndexOf("/") + 1,
													goalSelected.type.lastIndexOf(".")
												)}
											</td>
											<td data-label="Fréquence">{goalSelected.frequency}</td>
											<td data-label="Mise">
												{goalSelected.amount_by_frequency}€
											</td>
											<td data-label="Cumulé">{goalSelected.saving_amount}€</td>

											<td data-label="Objectif">
												{goalSelected.total_amount}€
											</td>
											<td data-label="Avancement">
												{(
													(goalSelected.saving_amount * 100) /
													goalSelected.total_amount
												).toFixed(0)}
												%
											</td>

											<td data-label="Participant(s)">
												{goalSelected.Users.map((user) => user.pseudo).join(
													", "
												)}
											</td>
											<td
												data-label="Statut"
												className={goalSelected.active ? mc.active : ""}
											>
												{goalSelected.active ? "Actif" : "Inactif"}
												{goalSelected.active && (
													<span className={mc.before}></span>
												)}
											</td>
											<td data-label="Début">
												{new Date(goalSelected.start_date).toLocaleDateString(
													"fr-FR"
												)}
											</td>
											<td data-label="Fin">
												{new Date(goalSelected.end_date).toLocaleDateString(
													"fr-FR"
												)}
											</td>
											<td data-label="Gérer">
												{user.id === goalSelected.author_id ? (
													<div
														className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCSA} ${mcApp.fWW}`}
													>
														<button
															onClick={() => handleOpenModal(goalSelected.id)}
														>
															Modifier
														</button>

														<button
															className={mc.removalBtn}
															onClick={() =>
																dispatch(deleteGoal(goalSelected.id))
															}
														>
															Supprimer
														</button>
													</div>
												) : (
													"Auteur uniquement"
												)}
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
						{showModal ? (
							<ModalGoal
								goalModal={goalModal}
								onClose={() => handleCloseModal()}
							/>
						) : (
							""
						)}
					</div>
				) : (
					<p>Vous êtes bien déconnecté !</p>
				)}
			</main>
			<Footer />
		</div>
	);
};

export default AnalyzeGoals;
