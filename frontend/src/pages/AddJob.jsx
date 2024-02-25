import { Form, useNavigation, useOutletContext, useActionData, redirect } from "react-router-dom";
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import FormRowSelect from "../components/FormRowSelect";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { SubmitBtn } from '../components';

export const action = async ({ request }) => {
  try {
    const data = await request.formData();
    const input = Object.fromEntries(data);
    const createJob = await customFetch.post('/jobs', input);
    toast.success(createJob.data.message);
    return redirect('all-jobs');
  } catch (err) {
    const error = err?.response?.data?.error;
    toast.error(error);
    return error;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation?.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow type="text" label="Job Location"
            name="jobLocation" defaultValue={user.location} />
          <FormRowSelect name={"jobStatus"} labelText={"Job Status"} list={Object.values(JOB_STATUS)} defaultValue={JOB_STATUS.PENDING} />
          <FormRowSelect name={"jobType"} labelText={"Job Type"} list={Object.values(JOB_TYPE)} defaultValue={JOB_TYPE.FULL_TIME} />
          <SubmitBtn submitting={isSubmitting} formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob;