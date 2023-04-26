import * as yup from "yup";

export const productSchema = yup
  .object({
    title: yup
      .string()
      .required("Please enter a title")
      .min(10, "Length at least 10 characters")
      .max(70, "Length at least 70 characters"),
    price: yup
      .number()
      .typeError("Price is required")
      .required("Price is required")
      .positive("Number must be positive")
      .max(500000, "Price must be under 50000 "),
    description: yup
      .string()
      .required("description is required")
      .min(30, "Length at least 30 characters")
      .max(300, "Length at least 300 characters"),
    category_id: yup
      .mixed()
      .oneOf([1, 2, 3, 4], "Please choose a category")
      .required("Please choose a category"),
    brand_id: yup
      .mixed()
      .oneOf([1, 2, 3, 4], "Please choose a brand")
      .required("Please choose a brand"),
    imageFile: yup.mixed().required("Please choose a image file"),
  })
  .required();
