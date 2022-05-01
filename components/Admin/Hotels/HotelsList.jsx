import { ListGroup } from "react-bootstrap";
import Alert from "../../Shared/Alert";
import Spinner from "../../Shared/Spinner";

export default function HotelsList({ hotels, loading, error }) {
	if (loading || (!error && !hotels)) {
		return <Spinner text="Getting establishments" />;
	} else if (error) {
		return (
			<Alert title="Something went wrong" variant="danger">
				We were unable to get the establishments from the server. Please try again later.
			</Alert>
		);
	} else if (hotels.length == 0) {
		return <Alert title="No establishments found">There are currently no establishments. Create one to get started!</Alert>;
	}

	return (
		<ListGroup>
			{hotels.map(({ id, attributes }) => {
				return (
					<ListGroup.Item
						action
						href={`./hotels/${id}`}
						as="a"
						className="d-flex justify-content-between align-items-start"
						key={id}
					>
						<div className="ms-2 me-auto">
							<div className="fw-bold">{attributes.name}</div>
							{attributes.type}
						</div>
					</ListGroup.Item>
				);
			})}
		</ListGroup>
	);
}
