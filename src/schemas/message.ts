import * as yup from "yup";

export const notificationSchema = yup.object().shape({
    message: yup.string().required("Message is required")
})