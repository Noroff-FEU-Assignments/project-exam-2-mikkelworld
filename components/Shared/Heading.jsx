import PropTypes from "prop-types";

export default function Heading(props) {
	const children = props.children;

	if (props.size) {
		if (props.size == "md") {
			return <h2 className="my-4">{children}</h2>;
		} else if (props.size == "sm") {
			return <h3 className="my-4">{children}</h3>;
		} else if (props.size == "xs") {
			return <h4>{children}</h4>;
		}
	}

	return <h1 className={props.className}>{children}</h1>;
}

Heading.propTypes = {
	size: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.string.isRequired,
};
