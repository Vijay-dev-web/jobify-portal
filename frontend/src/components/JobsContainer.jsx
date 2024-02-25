import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import Job from "./Job";
import { PaginationContainer } from '.';

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { allJobs, totalJobsCount } = data;

  if (allJobs?.length < 1) {
    return (
      <Wrapper>
        <h1> No Jobs Available...</h1>
      </Wrapper>
    )
  } else {
    return (
      <Wrapper>
        {
          allJobs.map(((job) => {
            return (
              <Job key={job._id} {...job} />
            )
          }))
        }
        {totalJobsCount > 10 && <PaginationContainer />}
      </Wrapper>
    );
  };
};

export default JobsContainer;