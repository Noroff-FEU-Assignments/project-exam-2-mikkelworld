import { ListGroup } from "react-bootstrap";

export default function EnquiryDetails({ enquiry }) {
	return (
		<ListGroup horizontal="md" className="mb-3">
			<ListGroup.Item variant="info">
				<strong>Enquirer:</strong> {enquiry.attributes.name}
			</ListGroup.Item>
			<ListGroup.Item variant="info">
				<strong>Date:</strong>{" "}
				{new Date(enquiry.attributes.createdAt).toLocaleDateString("en-us", {
					weekday: "short",
					year: "numeric",
					month: "short",
					day: "numeric",
				})}
			</ListGroup.Item>
			<ListGroup.Item variant="info">
				<strong>Establishment:</strong> {enquiry.attributes.hotel.data.attributes.name}
			</ListGroup.Item>
		</ListGroup>
	);
}
