import PropTypes from "prop-types";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../context/AuthContext";
import Layout from "../Layout/Layout";

export default function RouterGuard({ children, redirect = "/" }) {
	const router = useRouter();
	const auth = useContext(AuthContext);

	useEffect(() => {
		if (!auth) router.push(redirect);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (auth) {
		return children;
	}

	return <Layout />;
}

RouterGuard.propTypes = {
	children: PropTypes.node.isRequired,
	redirect: PropTypes.string,
};
