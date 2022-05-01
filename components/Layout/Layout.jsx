import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function Layout({ children }) {
	// Active link styling with Next router, courtesy of https://dev.to/yuridevat/how-to-add-styling-to-an-active-link-in-nextjs-593e
	const router = useRouter();

	return (
		<>
			<Navigation />
			<main className="container">{children}</main>
			<Footer />
		</>
	);
}

Layout.propTypes = {
	children: PropTypes.node,
};
