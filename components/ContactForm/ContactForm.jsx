import axios from "axios";
import { BASE_URL } from "../../constants/api";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Row, Col, Button, FloatingLabel, Alert } from "react-bootstrap";

export default function ContactForm() {
	const messageUrl = BASE_URL + "/api/messages";
	let formRef = useRef(null);

	const [submitError, setSubmitError] = useState(null);
	const [submitted, setSubmitted] = useState(false);

	const schema = yup.object().shape({
		name: yup.string().required("Please provide a name").min(3, "Your name must be at least 3 characters long"),
		email: yup.string().email("Please provide a valid e-mail address").required("Please provide an e-mail address"),
		subject: yup.string().required("Please tell us what the message is about"),
		message: yup.string().required("Please include a message").min(10, "The message must be at least 10 characters long"),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		// Reformat message for Strapi
		const message = { data: data };

		try {
			const res = await axios.post(messageUrl, message);
			// Reset form and show success on status 200
			if (res.status == 200) {
				setSubmitted(true);
				setSubmitError(null);
				reset();
			}
		} catch (error) {
			setSubmitError(error.toString());
		}
	};

	// Removes success message and shows form again when we click to send another message
	const handleReset = () => {
		setSubmitted(false);
	};

	// Show success message if submitted
	if (submitted) {
		return (
			<>
				<Alert variant="success">
					<h4>Thank you for contacting us!</h4>
					<span>We will get back to you as soon as possible</span>
				</Alert>
				<Button onClick={handleReset}>Send another message</Button>
			</>
		);
	}

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)} ref={formRef} className="contact-form mb-4">
				<Row className="mb-3">
					<Form.Group as={Col} sm={12} md={6} className="mb-3 mb-md-0">
						<FloatingLabel label="Your name">
							<Form.Control {...register("name")} type="text" placeholder="John Doe" />
							{errors.name && <small className="text-danger">{errors.name.message}</small>}
						</FloatingLabel>
					</Form.Group>

					<Form.Group as={Col} sm={12} md={6} className="mb-3 mb-md-0">
						<FloatingLabel label="Your e-mail address">
							<Form.Control {...register("email")} type="text" placeholder="john@example.com" />
							{errors.email && <small className="text-danger">{errors.email.message}</small>}
						</FloatingLabel>
					</Form.Group>
				</Row>

				<Row className="mb-3">
					<Form.Group as={Col} sm={12} className="mb-3 mb-md-0">
						<FloatingLabel label="Subject">
							<Form.Control {...register("subject")} type="text" placeholder="What is the message about?" />
							{errors.subject && <small className="text-danger">{errors.subject.message}</small>}
						</FloatingLabel>
					</Form.Group>
				</Row>

				<Row className="mb-3">
					<Form.Group as={Col} sm={12} className="mb-3 mb-md-0">
						<FloatingLabel label="Message">
							<Form.Control {...register("message")} as="textarea" rows={10} placeholder="How can we help you?" />
							{errors.message && <small className="text-danger">{errors.message.message}</small>}
						</FloatingLabel>
					</Form.Group>
				</Row>

				{submitError && (
					<Alert variant="danger">
						<h4>Something went wrong</h4>
						<span>Please try again, or come back later.</span>
					</Alert>
				)}

				<Button className="px-5 py-3" variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</>
	);
}
