import { useRef, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { AUTH_URL } from "../../constants/api";
import { Form, Row, Col, Button, FloatingLabel, Alert } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Heading from "../Shared/Heading";
import AuthContext from "../../context/AuthContext";
import Spinner from "../Shared/Spinner";

export default function ContactForm() {
	const router = useRouter();

	const [submitError, setSubmitError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [auth, setAuth] = useContext(AuthContext);

	let formRef = useRef(null);

	const schema = yup.object().shape({
		email: yup.string().email("Please provide a valid e-mail address").required("Please provide an e-mail address"),
		password: yup.string().min(6, "Your password must be at least 6 characters long").required("Please provide a name"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		setLoading(true); // Show loading indicator while waiting for login

		const credentials = {
			identifier: data.email,
			password: data.password,
		};

		try {
			const res = await axios.post(AUTH_URL, credentials);

			// If successful login, store token and redirect to admin page
			if (res.status == 200) {
				setAuth({ token: res.data.jwt, name: res.data.user.username });
				router.push("/admin");
			}
		} catch (error) {
			setSubmitError(error.toString());
			setLoading(false);
		}
	};

	// Logs user out by clearing auth and redirects to homepage
	const redirectToDashboard = () => {
		setLoading(true);
		router.push("/admin");
	};

	// Logs user out by clearing auth and redirects to homepage
	const logout = () => {
		setLoading(true);
		setAuth(null);
		router.push("/");
	};

	// Show loading indicator if waiting for login/logout
	if (loading) {
		return <Spinner />;
	}

	// Show signout and go to dashboard if user already signed in
	if (auth && auth.token) {
		return (
			<>
				<Row>
					<Col sm={12} md={8} lg={6} xl={5}>
						<Heading>{`Hello ${auth.name || "there"}`}</Heading>
						<p className="mb-0">You are already signed in.</p>
						<p>You can sign out or proceed to the dashboard to manage establishments, enquiries and messages.</p>
						<Button onClick={logout} variant="danger" className="me-2">
							Sign out
						</Button>
						<Button onClick={redirectToDashboard}>Go to Dashboard</Button>
					</Col>
				</Row>
			</>
		);
	}

	// Show login form if user isn't signed in
	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)} ref={formRef} className="login-form">
				<Row className="mb-3 justify-content-center">
					<Form.Group as={Col} sm={12} md={6}>
						<Heading className="mb-4">Sign in</Heading>
						<FloatingLabel label="E-mail address">
							<Form.Control {...register("email")} type="text" placeholder="E-mail" />
							{errors.email && <small className="text-danger">{errors.email.message}</small>}
						</FloatingLabel>
					</Form.Group>
				</Row>
				<Row className="mb-3 justify-content-center">
					<Form.Group as={Col} sm={12} md={6}>
						<FloatingLabel label="Password">
							<Form.Control {...register("password")} type="password" placeholder="Password" />
							{errors.password && <small className="text-danger">{errors.password.message}</small>}
						</FloatingLabel>
					</Form.Group>
				</Row>
				{submitError && (
					<Row className="mb-3 justify-content-center">
						<Col sm={12} md={6}>
							<Alert variant="danger" className="m-0">
								<h4>Something went wrong</h4>
								<span>Please try again, or come back later.</span>
							</Alert>
						</Col>
					</Row>
				)}
				<Row className="justify-content-center">
					<Col sm={12} md={6}>
						<Button className="px-5 py-3" variant="primary" type="submit">
							Sign in
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
}
