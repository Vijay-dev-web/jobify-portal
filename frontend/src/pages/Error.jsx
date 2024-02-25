import { Link, useRouteError } from "react-router-dom";
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';

const Error = () => {
	const error = useRouteError();
	if (error?.status === 404) {
		return (
			<Wrapper>
				<div>
					<img src={img} alt="not-found"></img>
					<h3>Oh oh...Page Not Found!!!</h3>
					<p>Unable to find the page you're looking for</p>
					<Link to="/dashboard">back home</Link>
				</div>
			</Wrapper>
		)
	}

	return (
		<>
			<h3>Something went wrong!!!</h3>
		</>
	);
}

export default Error;