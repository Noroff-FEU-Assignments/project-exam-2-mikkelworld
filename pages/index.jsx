import Head from "../components/Layout/Head";
import Layout from "../components/Layout/Layout";
import { Row, Col, Card, Button } from "react-bootstrap";
import Image from "next/image";
import Searchbar from "../components/Searchbar/Searchbar";

export default function Home(props) {
	return (
		<Layout>
			<Head title="Find accomodations" />

			<Row className="mb-3">
				<Col>
					<Searchbar />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col>
					<div className="banner">
						<Image
							alt="View from the docks in Bergen"
							src="/images/bergen-banner.jpg"
							objectFit="cover"
							height={700}
							width={1920}
							layout="intrinsic"
							priority
						/>
						<div className="banner-text">
							<h1 className="m">Holidaze - Your guide to Bergen</h1>
							<p>
								Explore Bergen in your own way. At Holidaze, we provide you with the ultimate guide to hotels, B&B, and
								guesthouses, so that you can find the place to stay that best matches your plans and budget.
							</p>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col sm={12}>
					<h2 className="mt-2 mb-3 text-center text-md-start">How does it work?</h2>
				</Col>
				<Col sm={12} md={6} lg={4} className="mb-4">
					<Card className="h-100 shadow border-0">
						<Card.Body className="d-flex flex-column justify-content-between gap-2">
							<div>
								<Card.Title>Find a hotel</Card.Title>
								<Card.Text>
									Browse our list of hotels, B&B, and guesthouses and find a place that matches your needs and budget.
								</Card.Text>
							</div>
							<Button as="a" href="/hotels" variant="primary">
								See establishments
							</Button>
						</Card.Body>
					</Card>
				</Col>
				<Col sm={12} md={6} lg={4} className="mb-4">
					<Card className="h-100 shadow border-0">
						<Card.Body>
							<Card.Title>Get in touch</Card.Title>
							<Card.Text>
								If you have any questions about the establishment or want to book a stay, use the <strong>Enquire</strong>{" "}
								button on the hotel page to send a message to the owner.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col sm={12} md={12} lg={4} className="mb-4">
					<Card className="h-100 shadow border-0">
						<Card.Body className="d-flex flex-column justify-content-between gap-2">
							<div>
								<Card.Title>Questions about our service?</Card.Title>
								<Card.Text>
									We are happy to answer your questions and take feedback about our website and services. Use the{" "}
									<strong>Contact</strong> page in the main menu to get in touch with Holidaze.
								</Card.Text>
							</div>
							<Button as="a" href="/contact" variant="primary">
								Contact Holidaze
							</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Layout>
	);
}
