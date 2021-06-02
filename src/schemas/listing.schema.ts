import { object, string, number, array } from "yup";

const payload = {
    body: object({
        condition: string().required("condition is required"),
        status: string().required("status is required"),
    }),
};

export const createListingSchema = object({
    ...payload,
});
