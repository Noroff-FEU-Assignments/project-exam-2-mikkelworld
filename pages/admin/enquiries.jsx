import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Head from "../../components/Layout/Head";
import Layout from "../../components/Layout/Layout";
import Heading from "../../components/Shared/Heading";
import EnquiryList from "../../components/Admin/Enquiries/EnquiryList";
import RouterGuard from "../../components/RouterGuard/RouterGuard";
import { Breadcrumb } from "react-bootstrap";

export default function Enquiries() {
	const [enquiries, setEnquiries] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const authRequest = useAxios();

	useEffect(() => {
		async function getData() {
			setLoading(true);
			setError(null);

			try {
				const res = await authRequest.get("/api/enquiries?populate=*");
				setEnquiries(res.data.data);
			} catch (error) {
				setEnquiries(null);
				setError(error.toString());
			}

			setLoading(false);
		}

		getData();
	}, [authRequest]);

	return (
		<RouterGuard redirect="/login">
			<Layout>
				<Head title="All enquiries" />

				<Breadcrumb>
					<Breadcrumb.Item href="./">Dashboard</Breadcrumb.Item>
					<Breadcrumb.Item active>Enquiries</Breadcrumb.Item>
				</Breadcrumb>

				<Heading className="my-4">All enquiries</Heading>

				<EnquiryList loading={isLoading} error={error} enquiries={enquiries} />
			</Layout>
		</RouterGuard>
	);
}
