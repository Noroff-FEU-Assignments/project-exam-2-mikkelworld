import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/api";
import HotelsList from "../components/Hotels/HotelsList";
import Head from "../components/Layout/Head";
import Layout from "../components/Layout/Layout";
import Heading from "../components/Shared/Heading";
import Searchbar from "../components/Searchbar/Searchbar";
import Spinner from "../components/Shared/Spinner";

export default function Hotels() {
	const [hotels, setHotels] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getData() {
			setLoading(true);

			const res = await axios.get(BASE_URL + "/api/hotels?populate=featuredImage");

			try {
				setHotels(res.data.data);
			} catch (error) {
				setHotels(null);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		getData();
	}, []);

	return (
		<Layout>
			<Head title="All accomodations" />

			<Searchbar />

			<Heading className="my-4">All accomodations</Heading>

			{isLoading && <Spinner />}

			{!isLoading && <HotelsList hotels={hotels}></HotelsList>}
		</Layout>
	);
}
