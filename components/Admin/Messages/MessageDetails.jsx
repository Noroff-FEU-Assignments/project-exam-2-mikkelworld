import { ListGroup } from "react-bootstrap";

export default function MessageDetails({ message }) {
	return (
		<ListGroup horizontal="md" className="mb-3">
			<ListGroup.Item variant="info">
				<strong>Sender:</strong> {message.attributes.name}
			</ListGroup.Item>
			<ListGroup.Item variant="info">
				<strong>Date:</strong>{" "}
				{new Date(message.attributes.createdAt).toLocaleDateString("en-us", {
					weekday: "short",
					year: "numeric",
					month: "short",
					day: "numeric",
				})}
			</ListGroup.Item>
		</ListGroup>
	);
}
