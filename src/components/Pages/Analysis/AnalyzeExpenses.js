import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import mcApp from "../../app/app.module.scss";
import mc from "../../Pages/Analysis/analyze.module.scss";
import Apex from "./Apex";
import {
	initAuth,
	selectIsAuthenticated,
} from "../../../redux/reducers/auth.slice";
import { getExpenses } from "../../../redux/reducers/expense.slice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

const AnalyzeExpenses = () => {
	const dispatch = useDispatch();
	const { expenses, loading } = useSelector((store) => store.expense);
	const { user } = useSelector((store) => store.auth.auth);
	const isAuthenticated = useSelector(selectIsAuthenticated);

	const [selectedMonth, setSelectedMonth] = useState("");
	const [selectedYear, setSelectedYear] = useState("");
	const [expensesSelected, setExpensesSelected] = useState([]);

	//TRIER
	const [years, setYears] = useState([]);
	const [amountMin, setAmountMin] = useState(Number);
	const [amountMax, setAmountMax] = useState(Number);

	const [userSalary, setUserSalary] = useState(Number);
	function calculateSalary(expensesSelected, user) {
		const salary =
			user.salary -
			expensesSelected.reduce((acc, expense) => {
				return acc + expense.amount;
			}, 0);
		return salary;
	}
	useEffect(() => {
		const getYears = () => {
			let userExpenses = expenses.filter(
				(expense) => expense?.author_id === user?.id
			);
			const years = userExpenses.map((expense) =>
				new Date(expense.purchased_date).getFullYear()
			);
			const uniqueYears = Array.from(new Set(years)); // Enlève les doublons
			return uniqueYears.sort((a, b) => b - a); // Trie les années en ordre décroissant, du plus  récent au plus ancien
		};

		const years = getYears(expensesSelected);
		setYears(years);

		if (expenses.length > 0) {
			const salary = calculateSalary(expensesSelected, user);
			setUserSalary(salary);
		}
	}, [expensesSelected, user]);

	const handleFilter = (e) => {
		e.preventDefault();

		// Sauvegarde des dépenses initiales du user
		const userExpenses = expenses.filter(
			(expense) => expense.author_id === user.id
		);

		// Filtrage des dépenses
		const filteredExpenses = userExpenses.reduce((acc, expense) => {
			const purchasedDate = new Date(expense.purchased_date);
			const purchasedMonth = purchasedDate.getMonth() + 1;
			const purchasedYear = purchasedDate.getFullYear();
			if (
				(selectedMonth === "" || selectedMonth === purchasedMonth.toString()) &&
				(selectedYear === "" || selectedYear === purchasedYear.toString()) &&
				(amountMin === "" || expense.amount >= Number(amountMin)) &&
				(amountMax === "" || expense.amount <= Number(amountMax))
			) {
				acc.push(expense);
			}
			return acc;
		}, []);

		setExpensesSelected(filteredExpenses);

		const newSalary = calculateSalary(filteredExpenses, user);
		setUserSalary(newSalary);
	};

	// Réinitialisation du tri
	const handleResetFilters = () => {
		const userExpenses = expenses.filter(
			(expense) => expense.author_id === user.id
		);
		setAmountMax(0);
		setAmountMin(0);
		setSelectedMonth("");
		setSelectedYear("");
		setExpensesSelected([]);
	};

	//ouverture/fermeture modal
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setExpensesName([]);
	};

	const [searchQuery, setSearchQuery] = useState("");
	const [expensesName, setExpensesName] = useState([]);

	const handleExpenseSelection = (expenseSelected) => {
		setExpensesName((prevExpensesName) => {
			if (
				!prevExpensesName.some((expense) => expense.id === expenseSelected.id)
			) {
				return [expenseSelected];
			} else {
				console.log("La dépense est déjà sélectionnée");
				return [];
			}
		});
	};

	// rechargement de page
	useEffect(() => {
		dispatch(getExpenses());
	}, [dispatch]);
	useEffect(() => {
		dispatch(initAuth());
	}, [dispatch]);
	return (
		<div>
			<Header />
			<main>
				<h2>Analyser vos dépenses</h2>
				<div
					className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mcApp.w100}`}
				>
					{showModal ? (
						<Modal
							expensesName={expensesName}
							onClose={() => handleCloseModal()}
						/>
					) : (
						""
					)}
				</div>
				{isAuthenticated ? (
					<form
						onSubmit={handleFilter}
						className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mcApp.w100}`}
					>
						<fieldset
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mc.sortExpenses} ${mcApp.m1} ${mcApp.p1}`}
						>
							<legend>Trier vos dépenses</legend>
							<article
								className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}  ${mcApp.w100} ${mcApp.p1}`}
							>
								<label
									htmlFor="months"
									className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
								>
									Mois :
									<select
										id="months"
										value={selectedMonth}
										onChange={(e) => setSelectedMonth(e.target.value)}
										required
									>
										<option value="">Mois</option>
										<option value="1">Janvier</option>
										<option value="2">Février</option>
										<option value="3">Mars</option>
										<option value="4">Avril</option>
										<option value="5">Mai</option>
										<option value="6">Juin</option>
										<option value="7">Juillet</option>
										<option value="8">Aout</option>
										<option value="9">Septembre</option>
										<option value="10">Octobre</option>
										<option value="11">Novembre</option>
										<option value="12">Decembre</option>
									</select>
								</label>
								<label
									htmlFor="years"
									className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
								>
									Année :
									<select
										id="years"
										value={selectedYear}
										onChange={(e) => setSelectedYear(e.target.value)}
										required
									>
										<option value="">All</option>
										{years.map((year) => (
											<option key={year} value={year}>
												{year}
											</option>
										))}
									</select>
								</label>
							</article>
							<article
								className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCSA} ${mcApp.fWW} ${mcApp.w100} ${mcApp.p1}`}
							>
								<label
									htmlFor="minAmount"
									className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
								>
									Montant min(€) :
									<input
										id="minAmount"
										type="number"
										value={amountMin}
										onChange={(e) => setAmountMin(e.target.value)}
										required
									/>
								</label>

								<label
									htmlFor="maxAmount"
									className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC}`}
								>
									Montant max(€) :
									<input
										id="maxAmount"
										type="number"
										value={amountMax}
										onChange={(e) => setAmountMax(e.target.value)}
										required
									/>
								</label>
							</article>
							<div className={mc.displayFlex}>
								<button type="submit">Filtrer</button>
								<button onClick={handleResetFilters}>Réinitialiser</button>
							</div>
						</fieldset>
						<fieldset
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mcApp.m1} ${mcApp.p1}`}
						>
							<legend>Résumé des dépenses</legend>
							<h3>
								Dépenses : <span>{user.salary - userSalary}€</span>
							</h3>
							<h3>
								Salaire restant : <span>{userSalary}€</span>
							</h3>
							<p className={mc.errorMessage}>
								{userSalary < 0 && (
									<span>
										Attention: les dépenses du mois dépassent votre salaire
										mensuel!
									</span>
								)}
							</p>
						</fieldset>
						<fieldset
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mcApp.m1} ${mcApp.p1} ${mc.apex}`}
						>
							<legend>Répartition par type</legend>
							{expensesSelected.length > 0 ? (
								<Apex expensesSelected={expensesSelected} user={user} />
							) : (
								<p>pas de dépenses trouvées</p>
							)}
						</fieldset>
						<fieldset
							className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCC} ${mcApp.fWW} ${mcApp.fDC} ${mcApp.m1} ${mcApp.p1}`}
						>
							<legend>Rechercher une dépense</legend>
							<input
								type="search"
								placeholder="Rechercher une dépense..."
								name="expenses"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							{loading ? (
								<p>Chargement des dépenses...</p>
							) : (
								<ul className={mc.pseudoList}>
									{expensesSelected
										.filter((expenseSelected) =>
											expenseSelected.name
												.toLowerCase()
												.includes(searchQuery.toLowerCase())
										)
										.map((expenseSelected) => (
											<li key={expenseSelected.id}>
												<label htmlFor={`expenseList ${expenseSelected.id}`}>
													<input
														id={`expenseList ${expenseSelected.id}`}
														type="checkbox"
														checked={expensesName.includes(expenseSelected)}
														onChange={() =>
															handleExpenseSelection(expenseSelected)
														}
														onClick={() => handleOpenModal()}
													/>
													{expenseSelected.name}
												</label>
											</li>
										))}
								</ul>
							)}
						</fieldset>
					</form>
				) : (
					<p>Vous êtes bien déconnecté !</p>
				)}
			</main>
			<Footer />
		</div>
	);
};

export default AnalyzeExpenses;
