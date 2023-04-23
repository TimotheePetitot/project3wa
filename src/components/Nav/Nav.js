import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/reducers/auth.slice";
import mc from "./nav.module.scss";
import mcApp from "../app/app.module.scss";
import { NavLink } from "react-router-dom";

const Nav = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	return (
		<nav>
			<ul className={`${mcApp.m0} ${mcApp.p0}`}>
				<li>
					{isAuthenticated ? (
						<NavLink
							to={"/HomeConnected"}
							className={(nav) => (nav.isActive ? mc["active"] : "")}
						>
							Accueil
						</NavLink>
					) : (
						<NavLink
							to={"/"}
							className={(nav) => (nav.isActive ? mc["active"] : "")}
						>
							Accueil
						</NavLink>
					)}
				</li>
				<li>
					<NavLink
						to={"/Help"}
						className={(nav) => (nav.isActive ? mc["active"] : "")}
					>
						Contact
					</NavLink>
				</li>
				<li>
					{isAuthenticated ? (
						<NavLink
							to={"/Profil"}
							className={(nav) => (nav.isActive ? mc["active"] : "")}
						>
							Mon profil
						</NavLink>
					) : (
						<NavLink
							to={"/Login"}
							className={(nav) => (nav.isActive ? mc["active"] : "")}
						>
							S'indentifier / S'inscrire
						</NavLink>
					)}
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
