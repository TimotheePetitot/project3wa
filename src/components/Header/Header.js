import React from "react";
import Nav from "../Nav/Nav";
import logo from "../../media/images/Logo/logo.png";
import mc from "./headerfooter.module.scss";
import mcApp from "../app/app.module.scss";

const Header = () => {
	return (
		<header className={`${mcApp.dF} ${mcApp.aIC} ${mcApp.jCSA} ${mcApp.fWW}`}>
			<img
				src={logo}
				alt="Logo du site"
				className={`${mcApp.p2} ${mcApp.dB}`}
			/>
			<Nav />
		</header>
	);
};

export default Header;
