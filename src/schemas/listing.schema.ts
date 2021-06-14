import { object, string, number, array } from "yup";

const payload = {
    body: object({
        condition: string().required("condition is required"),
        status: string(),
        image: string().required("image is required"),
    }),
};

export const createListingSchema = object({
    ...payload,
});
