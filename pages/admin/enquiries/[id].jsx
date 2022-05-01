import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAxios from "../../../hooks/useAxios";
import Head from "../../../components/Layout/Head";
import Layout from "../../../components/Layout/Layout";
import Heading from "../../../components/Shared/Heading";
import RouterGuard from "../../../components/RouterGuard/RouterGuard";
import { Breadcrumb, Button, Card } from "react-bootstrap";
import EnquiryDetails from "../../../components/Admin/Enquiries/EnquiryDetails";
import Spinner from "../../../components/Shared/Spinner";
import Alert from "../../../components/Shared/Alert";

export default function Enquiry() {
	const router = useRouter();

	const [enquiry, setEnquiry] = useState(null);
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
					const res = await authRequest.get(`/api/enquiries/${id}?populate=*`);
					// console.log(res.data.data);
					setEnquiry(res.data.data);
				} catch (error) {
					setEnquiry(null);
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}
		}

		getData();
	}, [router.isReady, authRequest, router.query]);

	const deleteEnquiry = async () => {
		const { id } = router.query;

		try {
			const res = await authRequest.delete(`/api/enquiries/${id}`);

			if (res.status == 200) {
				router.push("/admin/enquiries");
			}
		} catch (error) {
			setError(error.toString());
		}
	};

	if (isLoading || (!error && !enquiry)) {
		return <Spinner />;
	} else if (error) {
		return (
			<Layout>
				<Head title="Something went wrong" />
				<Heading className="my-4">Unable to get enquiry</Heading>
				<Alert title="Something went wrong" variant="danger">
					We were unable to get the enquiry from the server. Please try again later.
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
				<Head title={enquiry.attributes.title} />

				<Breadcrumb>
					<Breadcrumb.Item href="../">Dashboard</Breadcrumb.Item>
					<Breadcrumb.Item href="./">Enquiries</Breadcrumb.Item>
					<Breadcrumb.Item active>{enquiry.attributes.title}</Breadcrumb.Item>
				</Breadcrumb>

				<Heading className="my-4">{enquiry.attributes.title}</Heading>
				<EnquiryDetails enquiry={enquiry} />
				<Card>
					<Card.Body>
						<Card.Title>
							<strong>Enquiry</strong>
						</Card.Title>
						<Card.Text>
							{enquiry.attributes.message}
							<a href={`mailto:${enquiry.attributes.email}`} className="d-block text-secondary mt-3">
								- {enquiry.attributes.name} <small>({enquiry.attributes.email})</small>
							</a>
						</Card.Text>
					</Card.Body>
				</Card>
				<Button variant="danger" className="mt-3 me-2" onClick={deleteEnquiry}>
					Delete enquiry
				</Button>
				<Button as="a" href={`mailto:${enquiry.attributes.email}`} className="mt-3">
					Respond by e-mail
				</Button>
			</Layout>
		</RouterGuard>
	);
}
