import LoginForm from "../components/LoginForm/LoginForm";
import Head from "../components/Layout/Head";
import Layout from "../components/Layout/Layout";

export default function Login() {
	return (
		<Layout>
			<Head title="Sign in" />
			<LoginForm />
		</Layout>
	);
}
