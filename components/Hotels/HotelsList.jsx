import { BASE_URL } from "../../constants/api";
import { Row, Col, Card, Alert } from "react-bootstrap";
import HotelTypeTag from "./HotelTypeTag";
import Link from "next/link";

export default function HotelsList({ hotels }) {
	if (hotels && hotels.length > 0) {
		return (
			<Row>
				{hotels.map(({ id, attributes }) => {
					return (
						<Col xs={12} md={6} lg={6} xl={4} className="mb-4" key={id}>
							<Link href={`/hotels/${attributes.slug}`} passHref>
								<Card className="hotels-list__card">
									<Card.Img variant="top" src={attributes.featuredImage.data.attributes.url} />
									<Card.Body>
										<HotelTypeTag type={attributes.type} />
										<Card.Title>{attributes.name}</Card.Title>
										<Card.Text>{attributes.summary}</Card.Text>
									</Card.Body>
								</Card>
							</Link>
						</Col>
					);
				})}
			</Row>
		);
	} else {
		return (
			<Row>
				<Col xs={12} className="mb-4">
					<Alert variant="danger">
						<Alert.Heading className="mb-0 text-center">Whoops! Something went wrong :(</Alert.Heading>
					</Alert>
				</Col>
			</Row>
		);
	}
}
