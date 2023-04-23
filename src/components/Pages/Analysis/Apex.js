import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import { getExpenses } from "../../../redux/reducers/expense.slice";

const Apex = ({ expensesSelected }) => {
	const dispatch = useDispatch();
	const expenses = useSelector((store) => store.expense.expenses);
	// Filtrer les dépenses par type et calculer la somme des montants
	const getExpensesByType = (type) => {
		if (
			typeof expensesSelected !== "object" ||
			!Object.keys(expensesSelected).length
		) {
			return [];
		}
		const filteredExpenses = Object.values(expensesSelected).filter(
			(expense) => {
				return expense.type === `/Type/${type}.png`;
			}
		);
		return filteredExpenses.map((expense) => ({
			type,
			amount: expense.amount,
		}));
	};

	// Créer les catégories de la chart
	const getCategories = () => {
		return [
			"Alimentation",
			"Logement",
			"Transport",
			"Loisir",
			"Travail",
			"Sante",
			"Autre",
		];
	};

	const [series, setSeries] = useState(null);
	// Mettre à jour les séries et options à chaque fois que les données changent
	useEffect(() => {
		if (!expenses) {
			return;
		}

		const newSeries = getCategories().map((type) => {
			const expensesByType = getExpensesByType(type);
			const sum = expensesByType.reduce(
				(acc, expense) => acc + parseFloat(expense.amount),
				0
			);
			return {
				name: type,
				data: expensesByType.map((expense) => expense.amount),
				sum,
			};
		});

		const newCategories = newSeries
			.filter((serie) => serie.data.length > 0) // Filtrer les séries qui ont des données
			.map((serie) => serie.name);

		setSeries({
			options: {
				labels: newCategories,
				xaxis: {
					categories: newCategories,
				},
				//enlever bordure donut
				stroke: {
					show: false,
					width: 0,
				},
				legend: {
					position: "top",
					show: true,
					labels: {
						colors: ["#E4EDB9"],
						useSeriesColors: false,
					},
				},
				//taille du donut
				plotOptions: {
					pie: {
						donut: {
							size: "45%",
							align: "center",
						},
					},
				},
				dataLabels: {
					style: {
						fontSize: "10px",
						colors: ["#E4EDB9"],
					},
				},
				responsive: [
					{
						breakpoint: 600,
						dataLabels: {
							style: {
								fontSize: "6px",
							},
						},
						options: {
							chart: {
								width: "100%",
								align: "center",
							},
						},
					},
				],
				colors: [
					"#cfb84e", //jaune
					"#153612", //green
					"#673AB7", //purple
					"#a4381d", //rouge
					"#090979", //bluefoncé
					"#2196F3", //blueclair
					"#333", //noir
				],
			},
			series: newSeries.filter((serie) => serie.data.length > 0), // Filtrer les séries qui ont des données
		});
	}, [expenses, expensesSelected]);
	// recupération des donner expenses
	useEffect(() => {
		dispatch(getExpenses());
	}, [dispatch]);

	if (!series || !series.options) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			<div className="chart-wrap">
				<div id="chart">
					<ReactApexChart
						options={series.options}
						series={series.series.map((serie) => serie.sum)}
						type="donut"
						width={380}
					/>
				</div>
			</div>
		</div>
	);
};
export default Apex;
