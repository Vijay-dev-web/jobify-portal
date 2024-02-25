import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, Link, useSubmit } from "react-router-dom";
import { FormRow, FormRowSelect, SubmitBtn } from ".";
import { JOB_SORTING_OPTIONS, JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  const { searchParams } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchParams;

  const debounce = (callback) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        callback(form);
      }, 2000)
    }
  }

  const submit = useSubmit();
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search Form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form)
            })}
          />
          <FormRowSelect
            type="search"
            name="jobStatus"
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            type="search"
            name="jobType"
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.keys(JOB_SORTING_OPTIONS)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
};

export default SearchContainer;
