import PropTypes from "prop-types";
import NextHead from "next/head";

export default function Head({ title = "" }) {
	return (
		<NextHead>
			<title>
				{title}
				{title ? " - " : ""}Holidaze
			</title>
			<meta name="description" content="Holidaze helps you find the best vacation spots for your next adventure" />
			<link rel="icon" href="/favicon.ico" />
		</NextHead>
	);
}

Head.propTypes = {
	title: PropTypes.string,
};
