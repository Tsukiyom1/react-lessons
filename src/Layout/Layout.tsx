import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<footer>footer</footer>
		</>
	);
};

export default Layout;
