import axios from "axios";
import { BASE_URL } from "../../constants/api";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Row, Col, Button, FloatingLabel, Alert, Modal } from "react-bootstrap";

export default function EnquiryForm({ hotel, show, onClose }) {
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	const enquiryUrl = BASE_URL + "/api/enquiries";

	let formRef = useRef(null);

	const schema = yup.object().shape({
		name: yup.string().required("Please provide a name").min(3, "Your name must be at least 3 characters long"),
		email: yup.string().email("Please provide a valid e-mail address").required("Please provide an e-mail address"),
		title: yup.string().required("Please tell us what the message is about"),
		message: yup.string().required("Please include a message").min(10, "The message must be at least 10 characters long"),
		hotel: yup.number(),
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
		setSubmitting(true);

		// Reformat enquiry for Strapi
		const enquiry = { data: data };

		try {
			const res = await axios.post(enquiryUrl, enquiry);
			// Reset form and show success on status 200
			if (res.status == 200) {
				setSubmitted(true);
				setSubmitError(null);
			}
		} catch (error) {
			setSubmitError(error.toString());
		} finally {
			setSubmitting(false);
		}
	};

	// Resets the modal state when it's opened. Prevents retaining data if opened multiple times per pageload
	const handleEnter = () => {
		reset();
		setSubmitting(false);
		setSubmitted(false);
		setSubmitError(null);
	};

	return (
		<>
			<Modal size="lg" show={show} onHide={onClose} onEnter={handleEnter} centered scrollable backdrop={submitting ? "static" : true}>
				<Modal.Header closeButton>
					<Modal.Title>Enquire about {hotel.attributes.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{submitted && (
						<>
							<h4>Thank you for your interest!</h4>
							<p className="m-0">{hotel.attributes.name} has been notified and will respond to you as soon as possible.</p>
						</>
					)}
					{!submitted && (
						<>
							<p>
								Do you have any questions for this establishment? Fill out the form below to get your questions answered
								before your visit.
							</p>
							<Form onSubmit={handleSubmit(onSubmit)} ref={formRef} className="enquiry-form">
								<Form.Control {...register("hotel")} type="hidden" value={hotel.id} />
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
											<Form.Control {...register("title")} type="text" placeholder="What is the enquiry about?" />
											{errors.title && <small className="text-danger">{errors.title.message}</small>}
										</FloatingLabel>
									</Form.Group>
								</Row>

								<Row className="mb-3">
									<Form.Group as={Col} sm={12} className="mb-3 mb-md-0">
										<FloatingLabel label="Message">
											<Form.Control
												{...register("message")}
												as="textarea"
												rows={10}
												placeholder="What can we help you with?"
											/>
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
							</Form>
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={onClose} disabled={submitting}>
						Close
					</Button>
					{!submitted && (
						<Button variant="primary" onClick={handleSubmit(onSubmit)} disabled={submitting}>
							{submitting ? "Please wait..." : "Send enquiry"}
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</>
	);
}
