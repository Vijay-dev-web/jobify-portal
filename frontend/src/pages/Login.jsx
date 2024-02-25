import { Link, redirect, useNavigation, Form, useActionData, useNavigate } from 'react-router-dom';
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow, SubmitBtn } from "../components";
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
	const data = await request.formData();
	const input = Object.fromEntries(data);
	try {
		await customFetch.post('/auth/login', input);
		toast.success('Logged in successfully!');
		return redirect('/dashboard');
	} catch (error) {
		console.log(error);
		toast.error(error?.response?.data?.error);
		return error;
	}
}

const Login = () => {
	const navigate = useNavigate();
	const loginDemoUser = async () => {
		const data = {
			email: 'test@gmail.com',
			password: 'test@123'
		};

		try {
			await customFetch.post('/auth/login', data);
			toast.success('Take a test drive of the App!!!');
			navigate('/dashboard');
		} catch (err) {
			toast.error(err?.response?.data?.error);
		}
	}

	return (
		<Wrapper>
			<Form method="post" className="form">
				<Logo />
				<h4>Login</h4>
				<FormRow type="email" name="email" defaultValue="vijay@gmail.com" />
				<FormRow type="password" name="password" defaultValue="vijay" />
				<SubmitBtn />
				<button type="button" className="btn btn-block" onClick={loginDemoUser}>
					explore the app
				</button>
				<p>
					Not a member yet ?
					<Link to="/register" className="member-btn">
						Register
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
}

export default Login;