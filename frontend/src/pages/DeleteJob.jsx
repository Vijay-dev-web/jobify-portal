import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
    try {
        await customFetch.delete(`/jobs/${params.id}`);
        toast.success('job Deleted Successfully');
    } catch (err) {
        toast.error(err?.response?.data?.error);
    }
    return redirect('/dashboard/all-jobs');
};
