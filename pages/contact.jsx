import ContactForm from "../components/ContactForm/ContactForm";
import Head from "../components/Layout/Head";
import Layout from "../components/Layout/Layout";
import Heading from "../components/Shared/Heading";

export default function Contact() {
	return (
		<Layout>
			<Head title="Contact us" />
			<Heading>Contact us</Heading>
			<ContactForm />
		</Layout>
	);
}
