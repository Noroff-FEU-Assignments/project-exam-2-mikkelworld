import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function Navigation() {
	return (
		<>
			<footer expand="lg" className="mt-md-5 pt-3 pt-md-5">
				<Container>
					<Row>
						<Col sm={12} md={6} className="mb-3">
							<h3>Holidaze</h3>
							<p>Your guide to Bergen</p>
							<div className="d-flex gap-2 justify-content-center justify-content-md-start">
								<FontAwesomeIcon size="xl" icon={faInstagram} />
								<FontAwesomeIcon size="xl" icon={faTwitter} />
								<FontAwesomeIcon size="xl" icon={faFacebook} />
								<FontAwesomeIcon size="xl" icon={faYoutube} />
							</div>
						</Col>
						<Col sm={12} md={6}>
							<strong>Navigation</strong>
							<div className="navigation">
								<Link activeClassName="active" href="/">
									<a>Home</a>
								</Link>
								<Link activeClassName="active" href="/hotels">
									<a>Hotels</a>
								</Link>
								<Link activeClassName="active" href="/contact">
									<a>Contact</a>
								</Link>
								<Link activeClassName="active" href="/login">
									<a>Login</a>
								</Link>
							</div>
						</Col>
					</Row>
				</Container>
				<Container fluid>
					<Row className="mt-3 mt-md-5">
						<Col className="copyright">
							<span>Copyright © 2022 - Holidaze</span>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	);
}
