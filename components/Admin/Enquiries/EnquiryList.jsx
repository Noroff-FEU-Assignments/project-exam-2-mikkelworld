import { ListGroup } from "react-bootstrap";
import Alert from "../../Shared/Alert";
import Spinner from "../../Shared/Spinner";

export default function EnquiryList({ enquiries, loading, error }) {
	if (loading || (!error && !enquiries)) {
		return <Spinner text="Getting enquiries" />;
	} else if (error) {
		return (
			<Alert title="Something went wrong" variant="danger">
				We were unable to get the enquiries from the server. Please try again later.
			</Alert>
		);
	} else if (enquiries.length == 0) {
		return <Alert title="No enquiries found">There are currently no enquiries. Please check back later.</Alert>;
	}

	return (
		<ListGroup>
			{enquiries.map(({ id, attributes }) => {
				return (
					<ListGroup.Item
						action
						href={`./enquiries/${id}`}
						as="a"
						className="d-flex justify-content-between align-items-start"
						key={id}
					>
						<div className="ms-2 me-auto">
							<div className="fw-bold">{attributes.hotel.data.attributes.name}</div>
							{attributes.title}
						</div>
					</ListGroup.Item>
				);
			})}
		</ListGroup>
	);
}
