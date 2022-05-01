import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "../../constants/api";
import Head from "../../components/Layout/Head";
import Layout from "../../components/Layout/Layout";
import Heading from "../../components/Shared/Heading";
import Alert from "../../components/Shared/Alert";
import Image from "next/image";
import { Container, Row, Col, Button } from "react-bootstrap";
import HotelTypeTag from "../../components/Hotels/HotelTypeTag";
import EnquiryForm from "../../components/EnquiryForm/EnquiryForm";
import Spinner from "../../components/Shared/Spinner";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function HotelDetail() {
	const router = useRouter();

	const [hotel, setHotel] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	useEffect(() => {
		async function getData() {
			setLoading(true);
			setError(null);

			if (router.isReady) {
				const { slug } = router.query;

				try {
					const res = await axios.get(BASE_URL + `/api/hotels?filters[slug][$eq]=${slug}&populate=*`);
					setHotel(res.data.data[0]);
				} catch (error) {
					console.log(error);
					setError(error);
				} finally {
					setLoading(false);
				}
			}
		}
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading || (!error && !hotel)) {
		return (
			<Layout>
				<Head title="Please wait" />
				<Spinner />
			</Layout>
		);
	} else if (error) {
		return (
			<Layout>
				<Head title="Something went wrong" />
				<Heading className="my-4">Something went wrong</Heading>
				<Alert title="Something went wrong" variant="danger">
					We were unable to find the hotel you are looking for. Please return to the overview and try again, or try another hotel.
				</Alert>
				<Button as="a" href="./" className="mt-2">
					Go back
				</Button>
			</Layout>
		);
	}

	return (
		<Layout>
			<Head title={hotel.attributes.name} />

			<Container>
				<Row>
					<Col className="hotel-banner">
						<Image
							src={hotel.attributes.featuredImage.data.attributes.url}
							alt={hotel.attributes.name}
							layout="fill"
							objectFit="cover"
							className="hotel-banner__image"
							quality={100}
							priority
						></Image>
					</Col>
				</Row>
				<Row>
					<Col>
						<HotelTypeTag type={hotel.attributes.type} className="mt-4" />
						<div className="d-flex flex-column flex-md-row flex-md-wrap mb-4">
							<Heading className="flex-fill mb-2 mb-md-0">{hotel.attributes.name}</Heading>
							<Button className="" onClick={handleShowModal}>
								Send enquiry
							</Button>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<ReactMarkdown>{hotel.attributes.description}</ReactMarkdown>
					</Col>
				</Row>
			</Container>

			<EnquiryForm hotel={hotel} show={showModal} onClose={handleCloseModal} />
		</Layout>
	);
}
