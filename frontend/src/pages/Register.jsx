import { Form, redirect, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
	const data = await request.formData();
	const input = Object.fromEntries(data);

	try {
		await customFetch.post('/auth/register', input);
		toast.success('Registration Successful!!!');
		return redirect('/login');
	} catch (error) {
		console.log(error);
		toast.error(error?.response?.data?.error);
		return error;
	}
}

const Register = () => {
	return (
		<Wrapper>
			<Form method='post' className="form">
				<Logo />
				<h4>Register</h4>
				<FormRow type="text" name="name" defaultValue="Vijay" />
				<FormRow type="text" name="lastName" label="last name" defaultValue="J" />
				<FormRow type="text" name="location" defaultValue="Bangalore" />
				<FormRow type="email" name="email" defaultValue="vijay@gmail.com" />
				<FormRow type="password" name="password" defaultValue="vijay" />
				<SubmitBtn />
				<p>
					Already a member
					<Link to="/login" className="member-btn">
						Login
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
}

export default Register;