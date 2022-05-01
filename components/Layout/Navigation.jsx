import { Navbar, Nav, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
	// Active link styling with Next router, courtesy of https://dev.to/yuridevat/how-to-add-styling-to-an-active-link-in-nextjs-593e
	const router = useRouter();

	return (
		<>
			<Navbar expand="lg" className="py-3 py-lg-0">
				<Container>
					<Link href="/">
						<a className="navbar-brand d-flex align-items-center">
							<Image alt="Holidaze logo" src="/../images/holidaze-logo.svg" layout="fixed" height={32} width={135} priority />
						</a>
					</Link>
					<Navbar.Toggle />
					<Navbar.Collapse>
						<Nav className="mt-3 mt-lg-0">
							<Link activeClassName="active" href="/">
								<a className={router.pathname == "/" ? "active" : ""}>Home</a>
							</Link>
							<Link activeClassName="active" href="/hotels">
								<a className={router.pathname.startsWith("/hotels") ? "active" : ""}>Hotels</a>
							</Link>
							<Link activeClassName="active" href="/contact">
								<a className={router.pathname == "/contact" ? "active" : ""}>Contact</a>
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}
