import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAxios from "../../../hooks/useAxios";
import Head from "../../../components/Layout/Head";
import Layout from "../../../components/Layout/Layout";
import Heading from "../../../components/Shared/Heading";
import RouterGuard from "../../../components/RouterGuard/RouterGuard";
import { Breadcrumb, Button } from "react-bootstrap";
import Spinner from "../../../components/Shared/Spinner";
import Alert from "../../../components/Shared/Alert";
import HotelEditForm from "../../../components/Admin/Hotels/HotelEditForm";

export default function EditHotel() {
	const router = useRouter();

	const [hotel, setHotel] = useState(null);
	const [isNewHotel, setIsNewHotel] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const authRequest = useAxios();

	useEffect(() => {
		async function getData() {
			setLoading(true);
			setError(null);

			if (router.isReady) {
				const { id } = router.query;

				if (id === "create") {
					// console.log("Creating new hotel");
					setLoading(false);
					setIsNewHotel(true);
					return;
				}

				try {
					const res = await authRequest.get(`/api/hotels/${id}?populate=*`);
					// console.log(res.data.data);
					setHotel(res.data.data);
				} catch (error) {
					setHotel(null);
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}
		}
		getData();
	}, [router.isReady, authRequest, router.query]);

	if (!isNewHotel && (isLoading || (!error && !hotel))) {
		return <Spinner />;
	} else if (error) {
		return (
			<Layout>
				<Head title="Something went wrong" />
				<Heading className="my-4">Unable to get hotel</Heading>
				<Alert title="Something went wrong" variant="danger">
					We were unable to get the hotel from the server. Please try again later.
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
				<Head title={isNewHotel ? "New establishment" : hotel.attributes.name} />

				<Breadcrumb>
					<Breadcrumb.Item href="../">Dashboard</Breadcrumb.Item>
					<Breadcrumb.Item href="./">Establishments</Breadcrumb.Item>
					<Breadcrumb.Item active>{isNewHotel ? "New establishment" : hotel.attributes.name}</Breadcrumb.Item>
				</Breadcrumb>

				<Heading className="my-4">{isNewHotel ? "New establishment" : hotel.attributes.name}</Heading>

				<HotelEditForm hotel={hotel} create={isNewHotel} />
			</Layout>
		</RouterGuard>
	);
}
