import PropTypes from "prop-types";
import { Alert as BsAlert } from "react-bootstrap";

export default function Alert({ title, children, variant = "info" }) {
	return (
		<BsAlert variant={variant}>
			<h4>{title}</h4>
			{children}
		</BsAlert>
	);
}

Alert.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	variant: PropTypes.string,
};
