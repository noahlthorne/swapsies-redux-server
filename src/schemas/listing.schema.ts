import { object, string, number, array } from "yup";

const payload = {
    body: object({
        condition: string().required("condition is required"),
        status: string(),
    }),
};

export const createListingSchema = object({
    ...payload,
});
