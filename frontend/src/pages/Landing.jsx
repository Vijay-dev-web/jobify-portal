import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';
import { Link } from "react-router-dom";
import { Logo } from '../components';

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className="container page">
				<div className="info">
					<h1>Job <span>Tracking</span> app </h1>
					<p>Wayfarers banjo mlkshk cold-pressed trust fund hexagon. Vape pop-up jean shorts affogato jianbing everyday carry fingerstache williamsburg hot chicken.</p>
					<Link to="/register" className="btn register-link">Register</Link>
					<Link to="/login" className="btn ">Login / Demo user</Link>
				</div>
				<img src={main} alt="job hunt" className="img main-img" />
			</div>
		</Wrapper>
	);
}

export default Landing;

