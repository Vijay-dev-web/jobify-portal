import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from "../components";
import { createContext, useContext } from "react";

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries()
    ]);

    console.log('params : ', params);
    const searchValues = {
      ...params
    }

    console.log('searchValues : ', searchValues);
    const { data } = await customFetch.get('/jobs', {
      params
    });
    return { data, params };
  } catch (err) {
    toast.error(err?.response?.data?.error);
    return err;
  }
}

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data, params } = useLoaderData();
  return (
    <AllJobsContext.Provider value={{ data, searchParams: params }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
