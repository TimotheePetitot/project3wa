import React, { useState } from "react";
import type1 from "../../../media/images/GoalType/Alimentation.png";
import type2 from "../../../media/images/GoalType/Autre.png";
import type3 from "../../../media/images/GoalType/Logement.png";
import type4 from "../../../media/images/GoalType/Loisir.png";
import type5 from "../../../media/images/GoalType/Sante.png";
import type6 from "../../../media/images/GoalType/Transport.png";
import type7 from "../../../media/images/GoalType/Travail.png";
import { updateGoal } from "../../../redux/reducers/goal.slice";
import { useDispatch, useSelector } from "react-redux";

import mcApp from "../../app/app.module.scss";
import mc from "../../Pages/Analysis/analyze.module.scss";
import mcform from "../../Pages/Login/form.module.scss";

function ModalGoal({ goalModal, onClose }) {
	const dispatch = useDispatch();
	//modification des input
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [totalAmount, setTotalAmount] = useState();
	const [savingAmount, setSavingAmount] = useState();
	const [frequencyAmount, setFrequencyAmount] = useState();
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [statut, setStatut] = useState(goalModal.active);
	const [type, setType] = useState(goalModal.type);
	const [frequency, setFrequency] = useState(goalModal.frequency);
	const handleSubmit = (e) => {
		// e.preventDefault();
		const goalId = goalModal.id;
		const newType = type === "" ? goalModal.type : type;
		const newname = name === "" ? goalModal.name : name;
		const newDescription =
			description === "" ? goalModal.description : description;
		const newTotalAmount =
			totalAmount === "" ? goalModal.total_amount : totalAmount;
		const newSavingAmount =
			savingAmount === "" ? goalModal.saving_amount : savingAmount;
		const newFrequencyAmount =
			frequencyAmount === "" ? goalModal.amount_by_frequency : frequencyAmount;
		const newStartDate = startDate === "" ? goalModal.start_date : startDate;
		const newEndDate = endDate === "" ? goalModal.end_date : endDate;
		const newStatut = statut === "" ? goalModal.statut : statut;
		const newFrequency = frequency === "" ? goalModal.frequency : frequency;
		dispatch(
			updateGoal({
				goalId,
				name: newname,
				description: newDescription,
				total_amount: newTotalAmount,
				saving_amount: newSavingAmount,
				amount_by_frequency: newFrequencyAmount,
				start_date: newStartDate,
				end_date: newEndDate,
				active: newStatut,
				type: newType,
				frequency: newFrequency,
			})
		);
	};

	return (
		<div className={mc.modal}>
			<span className={mc.close} onClick={onClose}>
				&times;
			</span>
			<h2>Détails de l'objectif</h2>
			<form
				onSubmit={(e) => handleSubmit(e)}
				className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mc.goalContainer}`}
			>
				<article
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
				>
					<h3>{goalModal.name}</h3>
					<label htmlFor="name">Nouveau Nom</label>
					<input
						id="name"
						type="text"
						placeholder="Ecrire ici"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</article>
				<article
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
				>
					<h3>{goalModal.description}</h3>
					<label htmlFor="description">Nouvelle description</label>
					<input
						id="description"
						type="text"
						placeholder="Ecrire ici"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</article>
				<article
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
				>
					<h3>Montant Total : {goalModal.total_amount} €</h3>
					<label htmlFor="totalAmount">Nouveau montant total</label>
					<input
						id="totalAmount"
						type="number"
						placeholder="Ecrire ici"
						value={totalAmount}
						onChange={(e) => setTotalAmount(e.target.value)}
					/>
				</article>
				<article
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
				>
					<h3>Economie : {goalModal.saving_amount} €</h3>
					<label htmlFor="savingAmount">Nouveau montant économisé</label>
					<input
						id="savingAmount"
						type="number"
						placeholder="Ecrire ici"
						value={savingAmount}
						onChange={(e) => setSavingAmount(e.target.value)}
					/>
				</article>
				<article
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
				>
					<h3>Mise par fréquence : {goalModal.amount_by_frequency} €</h3>
					<label htmlFor="frequencyAmount">Nouveau montant par fréquence</label>
					<input
						id="frequencyAmount"
						type="number"
						placeholder="Ecrire ici"
						value={frequencyAmount}
						onChange={(e) => setFrequencyAmount(e.target.value)}
					/>
				</article>
				<article
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
				>
					<h3>Début : {goalModal.start_date}</h3>
					<label htmlFor="startDate">Nouvealle date de début</label>
					<input
						id="startDate"
						type="date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
					/>
				</article>
				<article
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
				>
					<h3>Fin : {goalModal.end_date}</h3>
					<label htmlFor="endDate">Nouvealle date de fin</label>
					<input
						id="endDate"
						type="date"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
					/>
				</article>
				<article
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
				>
					<h3>Statut</h3>
					{[true, false].map((value) => (
						<div key={value}>
							<label
								className={statut === (value === true) ? mcform.selectType : ""}
								htmlFor={`statut-${value}`}
							>
								{value === true ? "Actif" : "Inactif"}
							</label>
							<input
								type="radio"
								name="statut"
								id={`statut-${value}`}
								value={value}
								checked={statut === (value === true)}
								onChange={(e) => setStatut(e.target.value === "true")}
							/>
						</div>
					))}
				</article>
				<article
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
				>
					<h3>Fréquence</h3>
					{["hebdomadaire", "mensuel", "annuel"].map((newFrequency) => (
						<div key={newFrequency}>
							<label
								className={newFrequency === frequency ? mcform.selectType : ""}
								htmlFor={`frequency-${newFrequency}`}
							>
								{newFrequency.charAt(0).toUpperCase() + newFrequency.slice(1)}
							</label>
							<input
								type="radio"
								id={`frequency-${newFrequency}`}
								name="frequency"
								value={newFrequency}
								checked={newFrequency === frequency}
								onChange={(e) => setFrequency(e.target.value)}
							/>
						</div>
					))}
				</article>
				<article
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
				>
					<h3>Type</h3>
					<div
						className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCSA} ${mcApp.fWW} ${mc.typeGoalList}`}
					>
						{[
							{
								value: "/GoalType/Alimentation.png",
								alt: "Type d'objectif 'Nourriture'",
								src: type1,
							},
							{
								value: "/GoalType/Autre.png",
								alt: "Type d'objectif 'Autre'",
								src: type2,
							},
							{
								value: "/GoalType/Logement.png",
								alt: "Type d'objectif 'Logement'",
								src: type3,
							},
							{
								value: "/GoalType/Loisir.png",
								alt: "Type d'objectif 'Loisir'",
								src: type4,
							},
							{
								value: "/GoalType/Sante.png",
								alt: "Type d'objectif 'Sante'",
								src: type5,
							},
							{
								value: "/GoalType/Transport.png",
								alt: "Type d'objectif 'Transport'",
								src: type6,
							},
							{
								value: "/GoalType/Travail.png",
								alt: "Type d'objectif 'Travail'",
								src: type7,
							},
						].map(({ value, alt, src }) => (
							<label
								key={value}
								htmlFor={`type-${value}`}
								className={type === value ? mcform.selectType : ""}
							>
								<input
									type="radio"
									name="type"
									value={value}
									checked={type === value}
									id={`type-${value}`}
									onChange={(e) => setType(e.target.value)}
								/>
								<img src={src} alt={alt} />
							</label>
						))}
					</div>
				</article>
				<button type="submit">Soumettre</button>
			</form>
		</div>
	);
}

export default ModalGoal;
