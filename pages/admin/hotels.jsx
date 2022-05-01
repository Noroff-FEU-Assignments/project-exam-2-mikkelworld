import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Head from "../../components/Layout/Head";
import Layout from "../../components/Layout/Layout";
import Heading from "../../components/Shared/Heading";
import RouterGuard from "../../components/RouterGuard/RouterGuard";
import { Breadcrumb, Button } from "react-bootstrap";
import HotelsList from "../../components/Admin/Hotels/HotelsList";

export default function Enquiries() {
	const [hotels, setHotels] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const authRequest = useAxios();

	useEffect(() => {
		async function getData() {
			setLoading(true);
			setError(null);

			try {
				const res = await authRequest.get("/api/hotels?populate=*&sort=id");
				setHotels(res.data.data);
			} catch (error) {
				setHotels(null);
				setError(error.toString());
			}

			setLoading(false);
		}
		getData();
	}, [authRequest]);

	return (
		<RouterGuard redirect="/login">
			<Layout>
				<Head title="All establishments" />

				<Breadcrumb>
					<Breadcrumb.Item href="./">Dashboard</Breadcrumb.Item>
					<Breadcrumb.Item active>Establishments</Breadcrumb.Item>
				</Breadcrumb>

				<Heading className="my-4">All establishments</Heading>

				<Button as="a" href="/admin/hotels/create" className="mb-3">
					New establishment
				</Button>

				<HotelsList loading={isLoading} error={error} hotels={hotels} />
			</Layout>
		</RouterGuard>
	);
}
