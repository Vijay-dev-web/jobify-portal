import { Form, redirect, useLoaderData, useParams } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import AddJob from "./AddJob"
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";

export const loader = async ({ params }) => {
	try {
		const { data } = await customFetch.get(`/jobs/${params.id}`);
		return data;
	} catch (err) {
		toast.error(err?.response?.data?.error);
		return redirect('/dashboard/all-jobs')
	}
};

export const action = async ({ request, params }) => {
	try {
		const data = await request.formData();
		console.log('data : ', data);
		const input = Object.fromEntries(data);
		await customFetch.patch(`/jobs/${params.id}`, input);
		toast.success('Job updated successfully');
		return redirect('/dashboard/all-jobs')
	} catch (err) {
		toast.error(err?.response?.data?.error);
		return err;
	}
}

const EditJob = () => {
	const { job } = useLoaderData();
	return (
		<Wrapper>
			<Form method="post">
				<h4 className="form-title">Edit Job</h4>
				<div className="form-center">
					<FormRow type="text" name="position" label="Position" defaultValue={job.position} />
					<FormRow type="text" name="company" label="Company" defaultValue={job.company} />
					<FormRow type="text" name="jobLocation" label="Job Location" defaultValue={job.jobLocation} />
					<FormRowSelect name="jobStatus" labelText="Job Status" list={Object.values(JOB_STATUS)} defaultValue={job.jobStatus} />
					<FormRowSelect name="jobType" labelText="Job Type" list={Object.values(JOB_TYPE)} defaultValue={job.jobType} />
				</div>
				<SubmitBtn formBtn />
			</Form>
		</Wrapper>
	);
}

export default EditJob;