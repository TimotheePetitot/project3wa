import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

import mcApp from "../../app/app.module.scss";
import mc from "./expense.module.scss";
import mcform from "../../Pages/Login/form.module.scss";

import Type1 from "../../../media/images/Type/Alimentation.png";
import Type2 from "../../../media/images/Type/Transport.png";
import Type3 from "../../../media/images/Type/Logement.png";
import Type4 from "../../../media/images/Type/Loisir.png";
import Type5 from "../../../media/images/Type/Travail.png";
import Type6 from "../../../media/images/Type/Sante.png";
import Type7 from "../../../media/images/Type/Autre.png";
import { useDispatch, useSelector } from "react-redux";
import { createNewExpense } from "../../../redux/reducers/expense.slice";
import {
	selectIsAuthenticated,
	initAuth,
} from "../../../redux/reducers/auth.slice";

const Expense = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState(0);
	const [buyingDate, setBuyingDate] = useState("");
	//mettre un message d'erreur si les champs ne sont pas remplie. Le message showSuccessMessage apparait meme si pas de remplissage
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	//gestion des class des Types
	const [selectedType, setSelectedType] = useState("");

	const handleSelectType = (e) => {
		setSelectedType(e.target.value);
	};

	//soumission du form
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("type", selectedType);
		formData.get("type");
		await dispatch(
			createNewExpense({
				name,
				description,
				amount,
				purchased_date: buyingDate,
				type: selectedType,
			})
		);

		//erreur si on ne remplie pas les champs mais le message s'affiche quand meme
		setShowSuccessMessage(true);
	};

	// rechargement de page
	useEffect(() => {
		dispatch(initAuth());
	}, [dispatch]);
	return (
		<div>
			<Header />
			<main>
				{isAuthenticated ? (
					<div>
						<h2>Entrer ou Programmer une dépense </h2>

						<form
							onSubmit={(e) => handleSubmit(e)}
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mcApp.w100}`}
						>
							<fieldset className={`${mcApp.m1} ${mcApp.p1}`}>
								<legend>Nom</legend>
								<input
									type="text"
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</fieldset>
							<fieldset className={`${mcApp.m1} ${mcApp.p1}`}>
								<legend>Description</legend>
								<input
									type="text"
									name="description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</fieldset>

							<fieldset className={`${mcApp.m1} ${mcApp.p1}`}>
								<legend>Type</legend>
								<div
									className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCSA} ${mcApp.fWW} ${mc.typeContainer}`}
								>
									{[
										{
											value: "/Type/Alimentation.png",
											alt: "Image du type 1",
											src: Type1,
										},
										{
											value: "/Type/Transport.png",
											alt: "Image du type 2",
											src: Type2,
										},
										{
											value: "/Type/Logement.png",
											alt: "Image du type 3",
											src: Type3,
										},
										{
											value: "/Type/Loisir.png",
											alt: "Image du type 4",
											src: Type4,
										},
										{
											value: "/Type/Travail.png",
											alt: "Image du type 5",
											src: Type5,
										},
										{
											value: "/Type/Sante.png",
											alt: "Image du type 6",
											src: Type6,
										},
										{
											value: "/Type/Autre.png",
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

							<fieldset className={`${mcApp.m1} ${mcApp.p1}`}>
								<legend>Montant (€)</legend>
								<input
									type="number"
									name="amount"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
								/>
							</fieldset>

							<fieldset className={`${mcApp.m1} ${mcApp.p1}`}>
								<legend>Date d'achat</legend>
								<input
									type="date"
									name="BuyingDate"
									value={buyingDate}
									onChange={(e) => setBuyingDate(e.target.value)}
								/>
							</fieldset>

							<button type="submit">Ajouter</button>
							{showSuccessMessage && (
								<p>
									Votre dépense a bien été créée. Veuillez vous rentre dans la
									partie "Analyser vos dépenses" pour l'examiner de nouveau.
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

export default Expense;
