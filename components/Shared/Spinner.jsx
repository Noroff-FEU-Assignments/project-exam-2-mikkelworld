import { Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Spinner({ text = "Please wait" }) {
	return (
		<Row className="justify-content-center my-5">
			<FontAwesomeIcon className="mb-3" icon={faSpinner} color="#673ab7" size="3x" spin />
			<h3 className="text-center">{text}</h3>
		</Row>
	);
}
