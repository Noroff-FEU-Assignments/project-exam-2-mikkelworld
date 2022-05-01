import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAxios from "../../../hooks/useAxios";
import Head from "../../../components/Layout/Head";
import Layout from "../../../components/Layout/Layout";
import Heading from "../../../components/Shared/Heading";
import RouterGuard from "../../../components/RouterGuard/RouterGuard";
import { Breadcrumb, Button, Card } from "react-bootstrap";
import MessageDetails from "../../../components/Admin/Messages/MessageDetails";
import Spinner from "../../../components/Shared/Spinner";
import Alert from "../../../components/Shared/Alert";

export default function Message() {
	const router = useRouter();

	const [message, setMessage] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const authRequest = useAxios();

	useEffect(() => {
		async function getData() {
			setLoading(true);
			setError(null);

			if (router.isReady) {
				const { id } = router.query;

				try {
					const res = await authRequest.get(`/api/messages/${id}`);
					// console.log(res.data.data);
					setMessage(res.data.data);
				} catch (error) {
					setMessage(null);
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}
		}
		getData();
	}, [router.isReady, authRequest, router.query]);

	const deleteMessage = async () => {
		const { id } = router.query;

		try {
			const res = await authRequest.delete(`/api/messages/${id}`);

			if (res.status == 200) {
				router.push("/admin/messages");
			}
		} catch (error) {
			setError(error.toString());
		}
	};

	if (isLoading || (!error && !message)) {
		return <Spinner />;
	} else if (error) {
		return (
			<Layout>
				<Head title="Something went wrong" />
				<Heading className="my-4">Unable to get message</Heading>
				<Alert title="Something went wrong" variant="danger">
					We were unable to get the message from the server. Please try again later.
					<small className="d-block mt-2">({error})</small>
				</Alert>
				<Button as="a" href="./" className="mt-2">
					Go back
				</Button>
			</Layout>
		);
	}

	return (
		<RouterGuard redirect="/login">
			<Layout>
				<Head title={message.attributes.subject} />

				<Breadcrumb>
					<Breadcrumb.Item href="../">Dashboard</Breadcrumb.Item>
					<Breadcrumb.Item href="./">Messages</Breadcrumb.Item>
					<Breadcrumb.Item active>{message.attributes.subject}</Breadcrumb.Item>
				</Breadcrumb>

				<Heading className="my-4">{message.attributes.subject}</Heading>
				<MessageDetails message={message} />
				<Card>
					<Card.Body>
						<Card.Title>
							<strong>Message</strong>
						</Card.Title>
						<Card.Text>
							{message.attributes.message}
							<a href={`mailto:${message.attributes.email}`} className="d-block text-secondary mt-3">
								- {message.attributes.name} <small>({message.attributes.email})</small>
							</a>
						</Card.Text>
					</Card.Body>
				</Card>
				<Button variant="danger" className="mt-3 me-2" onClick={deleteMessage}>
					Delete message
				</Button>
				<Button as="a" href={`mailto:${message.attributes.email}`} className="mt-3">
					Respond by e-mail
				</Button>
			</Layout>
		</RouterGuard>
	);
}
