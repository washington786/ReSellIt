import * as yup from "yup";

export const listingSchema = yup.object().shape({
  title: yup.string().required("Invalid title."),
  price: yup.string().required("Invalid price"),
  category: yup.number().required("Select category"),
  description: yup.string().required("description required"),
});
