import { object, string, number, date } from "yup";

export const createGameSchema = object({
    body: object({
        title: string().required("Title is required"),
        gameConsole: string().required("console is required"),
        genre: string().required("genre is required"),
        description: string().required("description is required"),
        coverImage: string().required("cover image is required"),
        rating: number().required("rating is required").positive().integer(),
        releaseDate: string().required("release date is required"),
    }),
});
