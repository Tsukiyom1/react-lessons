import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
	return (
		<div className={styles.header}>
			<nav className={styles.nav}>
				<ul>
					<Link to='/'>Главная</Link>
				</ul>
				<ul>
					<Link to='/contact'>Контакты</Link>
				</ul>
			</nav>
		</div>
	);
};

export default Header;
