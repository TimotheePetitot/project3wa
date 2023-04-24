import React, { useState } from "react";
import type1 from "../../../media/images/Type/Alimentation.png";
import type2 from "../../../media/images/Type/Autre.png";
import type3 from "../../../media/images/Type/Logement.png";
import type4 from "../../../media/images/Type/Loisir.png";
import type5 from "../../../media/images/Type/Sante.png";
import type6 from "../../../media/images/Type/Transport.png";
import type7 from "../../../media/images/Type/Travail.png";
import {
	updateExpense,
	deleteExpense,
} from "../../../redux/reducers/expense.slice";

import mcApp from "../../app/app.module.scss";
import mcform from "../../Pages/Login/form.module.scss";
import mc from "../../Pages/Analysis/analyze.module.scss";

import { useDispatch } from "react-redux";
function Modal({ expensesName, onClose }) {
	//////////////////////////
	const dispatch = useDispatch();
	//update
	const [newName, setNewName] = useState(expensesName[0].name);
	const [newDescription, setNewDescription] = useState(
		expensesName[0].description
	);
	const [newAmount, setNewAmount] = useState(expensesName[0].amount);
	const [newPurchasedDate, setNewPurchasedDate] = useState(
		expensesName[0].purchased_date
	);
	const [newType, setNewType] = useState(expensesName[0].type);

	//cacher le texte
	const [typeClass, setTypeClass] = useState(mc.hidden);
	const [nameClass, setNameClass] = useState(mc.hidden);
	const [descriptionClass, setDescriptionClass] = useState(mc.hidden);
	const [amountClass, setAmountClass] = useState(mc.hidden);
	const [purchasedDateClass, setPurchasedDateClass] = useState(mc.hidden);
	const handleTypeClass = () => {
		setTypeClass(typeClass === mc.hidden ? mcform.visible : mc.hidden);
	};
	function handleNameClass() {
		setNameClass((prevClass) => (prevClass === mc.hidden ? "" : mc.hidden));
	}
	function handleAmountClass() {
		setAmountClass((prevClass) => (prevClass === mc.hidden ? "" : mc.hidden));
	}
	function handleDescriptionClass() {
		setDescriptionClass((prevClass) =>
			prevClass === mc.hidden ? "" : mc.hidden
		);
	}
	function handlePurchasedDateClass() {
		setPurchasedDateClass((prevClass) =>
			prevClass === mc.hidden ? "" : mc.hidden
		);
	}

	const handleTypeSelect = (e) => {
		setNewType(e.target.value);
	};

	const handleSubmit = (e) => {
		// e.preventDefault();
		const expenseId = expensesName[0].id;

		const formData = new FormData();
		formData.append("type", newType);

		const type = newType === "" ? expensesName[0].type : formData.get("type");
		const name = newName === "" ? expensesName[0].name : newName;
		const description =
			newDescription === "" ? expensesName[0].description : newDescription;
		const amount = newAmount === null ? expensesName[0].amount : newAmount;
		const purchasedDate =
			newPurchasedDate === ""
				? expensesName[0].purchased_date
				: newPurchasedDate;

		dispatch(
			updateExpense({
				expenseId: expenseId,
				name: name,
				description: description,
				amount: amount,
				purchased_date: purchasedDate,
				type,
			})
		);
		handleTypeSelect(e);
	};

	//suppression du user
	const [isDeleted, setIsDeleted] = useState(false);
	const handleDeleteExpense = () => {
		dispatch(deleteExpense(expensesName[0].id));
		setIsDeleted(true);
	};

	////////////////////
	return (
		<div className={mc.modal}>
			<span className={mc.close} onClick={onClose}>
				&times;
			</span>
			<h2>Détails de la dépense</h2>
			{expensesName.map((expenseName) => (
				<div
					key={expenseName.id}
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mc.modalContainer}`}
				>
					<article
						className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
					>
						<p>
							<strong>Nom : </strong>
							{expenseName.name}
						</p>
						<div>
							<button onClick={handleNameClass}>Changer le nom</button>
						</div>

						<form
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${nameClass}`}
							onSubmit={(e) => handleSubmit(e, "name", newName)}
						>
							<input
								type="text"
								placeholder="Nouveau nom"
								value={newName}
								onChange={(e) => setNewName(e.target.value)}
							/>
							<button type="submit">Soumettre</button>
						</form>
					</article>

					<article
						className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
					>
						<p>
							<strong>Description : </strong>
							{expenseName.description}
						</p>
						<div>
							<button onClick={handleDescriptionClass}>
								Changer la description
							</button>
						</div>
						<form
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${descriptionClass}`}
							onSubmit={(e) => handleSubmit(e, "description", newDescription)}
						>
							<input
								type="text"
								placeholder="Nouvelle description"
								value={newDescription}
								onChange={(e) => setNewDescription(e.target.value)}
							/>
							<button type="submit">Soumettre</button>
						</form>
					</article>

					<article
						className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mc.typeModalContainer}`}
					>
						<img
							src={process.env.PUBLIC_URL + expenseName.type}
							alt={`Type de dépense pour ${expenseName.name}`}
						/>

						<div>
							<button onClick={handleTypeClass}>
								Changer le type de dépense
							</button>
						</div>

						<form
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${typeClass}`}
							onSubmit={(e) => handleSubmit(e, "type", newType)}
						>
							<div
								className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCSA} ${mcApp.fWW} ${mc.typeList}`}
							>
								{[
									{
										value: "/Type/Alimentation.png",
										alt: "Type de dépense 'Nourriture'",
										src: type1,
									},
									{
										value: "/Type/Autre.png",
										alt: "Type de dépense autre",
										src: type2,
									},
									{
										value: "/Type/Logement.png",
										alt: "Type de dépense Logement",
										src: type3,
									},
									{
										value: "/Type/Loisir.png",
										alt: "Type de dépense Loisir",
										src: type4,
									},
									{
										value: "/Type/Sante.png",
										alt: "Type de dépense Sante",
										src: type5,
									},
									{
										value: "/Type/Transport.png",
										alt: "Type de dépense 'Transport'",
										src: type6,
									},
									{
										value: "/Type/Travail.png",
										alt: "Type de dépense 'Travail'",
										src: type7,
									},
								].map(({ value, alt, src }) => (
									<label
										htmlFor={`type ${value}`}
										key={value}
										className={newType === value ? mcform.selectType : ""}
									>
										<input
											id={`type ${value}`}
											type="radio"
											name="type"
											value={value}
											checked={newType === value}
											onChange={handleTypeSelect}
										/>
										<img src={src} alt={alt} />
									</label>
								))}
							</div>
							<button type="submit">Soumettre</button>
						</form>
					</article>

					<article
						className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
					>
						<p>
							<strong>
								Montant : <br />{" "}
							</strong>
							{expenseName.amount}€
						</p>
						<div>
							<button onClick={handleAmountClass}>Changer le montant</button>
						</div>
						<form
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${amountClass}`}
							onSubmit={(e) => handleSubmit(e, "amount", newAmount)}
						>
							<input
								type="text"
								placeholder="Nouveau montant"
								value={newAmount}
								onChange={(e) => setNewAmount(e.target.value)}
							/>
							<button type="submit">Soumettre</button>
						</form>
					</article>
					<article
						className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
					>
						<p>
							<strong>
								Date d'achat : <br />{" "}
							</strong>
							{new Date(expenseName.purchased_date).toLocaleDateString("fr-FR")}
						</p>
						<div>
							<button onClick={handlePurchasedDateClass}>
								Changer la date d'achat
							</button>
						</div>
						<form
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${purchasedDateClass}`}
							onSubmit={(e) =>
								handleSubmit(e, "purchasedDate", newPurchasedDate)
							}
						>
							<input
								type="date"
								value={newPurchasedDate}
								onChange={(e) => setNewPurchasedDate(e.target.value)}
							/>
							<button type="submit">Soumettre</button>
						</form>
					</article>
					<div>
						<button className={mc.removalBtn} onClick={handleDeleteExpense}>
							Supprimer la dépense
						</button>
					</div>
					{isDeleted ? <p>Votre dépense a été supprimée avec succès !</p> : ""}
				</div>
			))}
		</div>
	);
}

export default Modal;
