import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
    const { data } = await customFetch.get('/jobs/stats');
    return data;
}

const Stats = () => {
    const { defaultStats, monthlyApplications } = useLoaderData();
    return (
        <>
            <StatsContainer defaultStats={defaultStats} />
            <ChartsContainer data={monthlyApplications} />
        </>
    );
};

export default Stats;
