import { ListGroup } from "react-bootstrap";
import Alert from "../../Shared/Alert";
import Spinner from "../../Shared/Spinner";

export default function MessageList({ messages, loading, error }) {
	if (loading || (!error && !messages)) {
		return <Spinner text="Getting messages" />;
	} else if (error) {
		return (
			<Alert title="Something went wrong" variant="danger">
				We were unable to get the messages from the server. Please try again later.
			</Alert>
		);
	} else if (messages.length == 0) {
		return <Alert title="No messages found">There are currently no messages. Please check back later.</Alert>;
	}

	return (
		<ListGroup>
			{messages.map(({ id, attributes }) => {
				return (
					<ListGroup.Item
						action
						href={`./messages/${id}`}
						as="a"
						className="d-flex justify-content-between align-items-start"
						key={id}
					>
						<div className="ms-2 me-auto">
							<div className="fw-bold">{attributes.name}</div>
							{attributes.subject}
						</div>
					</ListGroup.Item>
				);
			})}
		</ListGroup>
	);
}
