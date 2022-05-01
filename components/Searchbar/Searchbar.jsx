import { useState, useEffect } from "react";
import axios from "axios";
import { Form, ListGroup } from "react-bootstrap";
import Heading from "../Shared/Heading";
import { BASE_URL } from "../../constants/api";

export default function Searchbar() {
	const [hotels, setHotels] = useState([]);
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Get all hotels from API so we can use them in typeahead
	useEffect(() => {
		async function getHotels() {
			try {
				const res = await axios.get(BASE_URL + "/api/hotels");

				if (res.status == 200) {
					const hotels = res.data;
					//console.log(hotels);
					setHotels(hotels.data);
				} else {
					setError("An error occured");
				}
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		getHotels();
	}, []);

	// Handles change in search box
	function handleChange(e) {
		const searchQuery = e.target.value.toLowerCase();
		setQuery(searchQuery);

		if (searchQuery && searchQuery.length > 0) {
			// I'm filtering with indexOf instead of startsWith for better user experience (i.e. "Miami Beach" vs "Comfort Inn - Miami Beach")
			setResults(hotels.filter((hotel) => hotel.attributes.name.toLowerCase().indexOf(searchQuery) > -1));
		} else {
			setResults([]);
		}
	}

	return (
		<div className="search-bar rounded">
			<Heading size="xs">Looking for something specific?</Heading>
			<div className="search-bar__search">
				<Form.Control type="text" placeholder="Search" size="lg" onChange={handleChange} />

				<ListGroup className="search-bar__results">
					{loading ? (
						<ListGroup.Item>Please wait...</ListGroup.Item>
					) : error ? (
						<ListGroup.Item>Unable to get hotel list</ListGroup.Item>
					) : query.length > 0 && results.length === 0 ? (
						<ListGroup.Item>No results. Try searching for something else.</ListGroup.Item>
					) : query.length > 0 && results.length > 0 ? (
						results.map(({ id, attributes }) => {
							return (
								<ListGroup.Item action href={"/hotels/" + attributes.slug} key={id}>
									{attributes.name}
								</ListGroup.Item>
							);
						})
					) : null}
				</ListGroup>
			</div>
		</div>
	);
}
