import useAxios from "../../../hooks/useAxios";
import { BASE_URL } from "../../../constants/api";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Row, Col, Button, FloatingLabel, Alert } from "react-bootstrap";
import Image from "next/image";

export default function HotelEditForm({ hotel, create }) {
	const [image, setImage] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [created, setCreated] = useState(false);
	const [newSlug, setNewSlug] = useState(null);
	const [updated, setUpdated] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [error, setError] = useState(null);

	const authRequest = useAxios();
	const hotelUrl = BASE_URL + "/api/hotels";

	let formRef = useRef(null);

	const schema = yup.object().shape({
		name: yup.string().required("Please provide a name").min(3, "The name must be at least 3 characters long"),
		summary: yup.string().required("Please provide a summary").min(10, "The summary must be at least 10 characters long"),
		description: yup.string().required("Please provide a description").min(20, "The description must be at least 20 characters long"),
		type: yup.string().required("Please select a type"),
		featuredImage: create ? yup.mixed().required("Please upload an image") : yup.mixed(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	// Get file from input
	const onFileChanged = (e) => {
		setImage(e.target.files[0]);
	};

	// Handle submit event
	const onSubmit = async (data) => {
		// Reset these values in case we're saving twice
		setError(null);
		setCreated(false);
		setUpdated(false);
		// Disables the form while we submit
		setSubmitting(true);

		const formData = new FormData();

		const hotelData = {
			name: data.name,
			description: data.description,
			summary: data.summary,
			type: data.type,
		};

		formData.append("data", JSON.stringify(hotelData));

		if (create) {
			// Create new hotel
			try {
				if (image) {
					formData.append("files.featuredImage", image, image.name);
				}

				const res = await authRequest.post(hotelUrl, formData);

				if (res.status == 200) {
					setNewSlug(res.data.data.attributes.slug);
					setCreated(true);
					setError(null);
				}
			} catch (error) {
				setError("Something went wrong while saving the establishment.");
			}
		} else {
			// Update existing hotel
			try {
				if (image) {
					// For updates, we need to upload image first and then update entry with image id
					const imageData = new FormData();
					imageData.append("files", image, image.name);
					// Upload
					const imageRes = await authRequest.post(BASE_URL + "/api/upload", imageData);
					// Update data with new image ID
					hotelData.featuredImage = imageRes.data[0].id;
					// Overwrite the formData with updated data including the image id
					formData.set("data", JSON.stringify(hotelData));
				}

				// Update entry
				const res = await authRequest.put(`${hotelUrl}/${hotel.id}`, formData);

				if (res.status == 200) {
					setNewSlug(res.data.data.attributes.slug);
					setUpdated(true);
					setError(null);
				} else {
					setError("Unable to save the establishment. Please ensure that the name is unique.");
				}
			} catch (error) {
				console.log(error);
				setError("Unable to save the establishment. Please ensure that the name is unique.");
			}
		}

		// Re-enable the form
		setSubmitting(false);
	};

	const onDelete = async () => {
		// Reset this before we attempt to delete
		setError(null);
		// Disable form while we delete
		setSubmitting(true);

		try {
			const res = await authRequest.delete(`/api/hotels/${hotel.id}`);
			if (res.status == 200) {
				setDeleted(true);
			} else {
				setError("Unable to delete the establishment.");
			}
		} catch (error) {
			setError("Unable to delete the establishment.");
		}

		setSubmitting(false);
	};

	if (!hotel && !create) {
		return (
			<Alert variant="danger">
				<h4>Unable to find hotel</h4>
				<span>Something went wrong and the hotel data cannot be found. Please return to the overview and try again.</span>
			</Alert>
		);
	}

	if (created) {
		return (
			<Alert variant="success" className="d-flex flex-column">
				<h4>Success!</h4>
				<span>The new establishment was successfully created.</span>
				<div className="mt-3">
					<Button as="a" href="./" className="me-2">
						Back to overview
					</Button>
					<Button as="a" href={`/hotels/${newSlug}`}>
						View establishment page
					</Button>
				</div>
			</Alert>
		);
	} else if (deleted) {
		return (
			<Alert variant="success" className="d-flex flex-column">
				<h4>Success!</h4>
				<span>The establishment was successfully deleted.</span>
				<div className="mt-3">
					<Button as="a" href="./" className="me-2">
						Back to overview
					</Button>
				</div>
			</Alert>
		);
	}

	return (
		<>
			{error && (
				<Alert variant="danger">
					<h4>Something went wrong</h4>
					<span>{error}</span>
				</Alert>
			)}
			{updated && (
				<Alert variant="success" className="d-flex flex-column">
					<h4>Success!</h4>
					<span>The establishment was successfully updated.</span>
					<div className="mt-3">
						<Button as="a" href={`/hotels/${newSlug}`}>
							View establishment page
						</Button>
					</div>
				</Alert>
			)}
			<Form onSubmit={handleSubmit(onSubmit)} ref={formRef} className="hotel-form">
				<fieldset disabled={submitting}>
					<Row className="mb-4">
						<Form.Group as={Col} sm={12} md={8} className="mb-4 mb-md-0">
							<FloatingLabel label="Name">
								<Form.Control
									{...register("name")}
									type="text"
									placeholder="Name of the establishment"
									defaultValue={hotel?.attributes?.name || ""}
								/>
								{errors.name && <small className="text-danger">{errors.name.message}</small>}
							</FloatingLabel>
						</Form.Group>

						<Form.Group as={Col} sm={12} md={4}>
							<FloatingLabel label="Type">
								<Form.Select {...register("type")} defaultValue={hotel?.attributes?.type || "Hotel"}>
									<option>Hotel</option>
									<option>B&B</option>
									<option>Guesthouse</option>
								</Form.Select>
								{errors.type && <small className="text-danger">{errors.type.message}</small>}
							</FloatingLabel>
						</Form.Group>
					</Row>

					<Row className="mb-4">
						<Form.Group as={Col} sm={12}>
							<FloatingLabel label="Summary">
								<Form.Control
									{...register("summary")}
									as="textarea"
									rows={3}
									placeholder="Short description of establishment"
									defaultValue={hotel?.attributes?.summary || ""}
								/>
								{errors.summary && <small className="text-danger">{errors.summary.message}</small>}
							</FloatingLabel>
						</Form.Group>
					</Row>

					<Row className="mb-3">
						<Form.Group as={Col} sm={12}>
							<FloatingLabel label="Description">
								<Form.Control
									{...register("description")}
									as="textarea"
									rows={10}
									placeholder="Describe the establishment in detail"
									defaultValue={hotel?.attributes?.description || ""}
								/>
								{errors.description && <small className="text-danger">{errors.description.message}</small>}
							</FloatingLabel>
						</Form.Group>
					</Row>

					<Row className="mb-4">
						{hotel && !create && (
							<Col sm={12} md={6}>
								<div style={{ height: "300px" }} className="position-relative shadow-sm">
									<Image
										src={hotel.attributes.featuredImage.data.attributes.url}
										layout="fill"
										objectFit="cover"
										alt={hotel.attributes.name + " banner"}
										className="rounded"
									/>
								</div>
							</Col>
						)}
						<Form.Group as={Col} sm={12} md={6}>
							<Form.Label>{!create ? "Change image" : "Upload image"}</Form.Label>
							<Form.Control {...register("featuredImage")} type="file" onChange={onFileChanged} />
							{errors.featuredImage && <small className="text-danger">{errors.featuredImage.message}</small>}
						</Form.Group>
					</Row>

					<Row className="mb-3">
						<Col sm={12} className="d-flex flex-column flex-md-row gap-2 gap-md-3">
							{!create && (
								<Button variant="danger" type="button" onClick={onDelete}>
									Delete establishment
								</Button>
							)}
							<Button variant="primary" type="submit">
								{submitting ? "Please wait" : "Save establishment"}
							</Button>
						</Col>
					</Row>
				</fieldset>
			</Form>
		</>
	);
}
