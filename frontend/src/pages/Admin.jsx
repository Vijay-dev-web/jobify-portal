import { redirect, useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/StatsContainer';
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { StatItem } from '../components';
import { FaCalendar, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';

export const loader = async () => {
	try {
		const { data } = await customFetch('/users/admin/app-stats');
		return data;
	}
	catch (err) {
		toast.error('Not authorized to view the page');
		return redirect('/dashboard');
	}
};

const Admin = () => {
	const { users, jobs } = useLoaderData();
	return (
		<Wrapper>
			<StatItem
				title={'Current Users'}
				count={users}
				color="#e9b949"
				bcg={'#fcefc7'}
				icon={<FaSuitcaseRolling />}
			/>
			<StatItem
				title={'Total Jobs'}
				count={jobs}
				color="#647acb"
				bcg={'#e0e8f9'}
				icon={<FaCalendarCheck />}
			/>
		</Wrapper>
	);
}

export default Admin;