import Head from "../components/Layout/Head";
import Layout from "../components/Layout/Layout";
import Heading from "../components/Shared/Heading";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function Admin() {
	return (
		<Layout>
			<Head title="Dashboard" />
			<Heading className="my-4">Dashboard</Heading>

			<Row>
				<Col sm={12} md={6} lg={4} className="mb-3 mb-md-4">
					<Card className="h-100 shadow border-0">
						<Card.Body>
							<Card.Title>Establishments</Card.Title>
							<Card.Text>Manage and create establishments that visitors can enquire about.</Card.Text>
							<Button as="a" href="./admin/hotels" variant="primary">
								Establishments
							</Button>
						</Card.Body>
					</Card>
				</Col>
				<Col sm={12} md={6} lg={4} className="mb-3 mb-md-4">
					<Card className="h-100 shadow border-0">
						<Card.Body>
							<Card.Title>Enquiries</Card.Title>
							<Card.Text>Read and manage enquiries about specific establishments.</Card.Text>
							<Button as="a" href="./admin/enquiries" variant="primary">
								Enquiries
							</Button>
						</Card.Body>
					</Card>
				</Col>
				<Col sm={12} md={6} lg={4} className="mb-3 mb-md-4">
					<Card className="h-100 shadow border-0">
						<Card.Body>
							<Card.Title>Messages</Card.Title>
							<Card.Text>Read and manage messages about the website or service.</Card.Text>
							<Button as="a" href="./admin/messages" variant="primary">
								Messages
							</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Layout>
	);
}
