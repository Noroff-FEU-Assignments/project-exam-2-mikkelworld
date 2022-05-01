import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Head from "../../components/Layout/Head";
import Layout from "../../components/Layout/Layout";
import Heading from "../../components/Shared/Heading";
import MessageList from "../../components/Admin/Messages/MessageList";
import RouterGuard from "../../components/RouterGuard/RouterGuard";
import { Breadcrumb } from "react-bootstrap";

export default function Messages() {
	const [messages, setMessages] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const authRequest = useAxios();

	useEffect(() => {
		async function getData() {
			setLoading(true);
			setError(null);

			try {
				const res = await authRequest.get("/api/messages");
				setMessages(res.data.data);
			} catch (error) {
				setMessages(null);
				setError(error.toString());
			}

			setLoading(false);
		}
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<RouterGuard redirect="/login">
			<Layout>
				<Head title="All messages" />

				<Breadcrumb>
					<Breadcrumb.Item href="./">Dashboard</Breadcrumb.Item>
					<Breadcrumb.Item active>Messages</Breadcrumb.Item>
				</Breadcrumb>

				<Heading className="my-4">All messages</Heading>

				<MessageList loading={isLoading} error={error} messages={messages} />
			</Layout>
		</RouterGuard>
	);
}
