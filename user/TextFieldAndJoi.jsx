import Joi from "joi";
const schema = Joi.object({
  firstName: Joi.string().min(2).required().messages({
    "string.empty": "First Name Required",
    "string.min": "First Name must be at least 2 length long",
  }),
  middleName: Joi.string().min(2).required().messages({
    "string.empty": "Middle Name Required",
    "string.min": "Middle Name must be at least 2 length long",
  }),
  lastName: Joi.string().min(2).required().messages({
    "string.empty": "Last Name Required",
    "string.min": "Last Name must be at least 2 length long",
  }),
  phone: Joi.string()
    .max(10)
    .regex(/^[0-9]{10}$/)
    .messages({
      "string.empty": "Phone Number is Required",
      "string.pattern.base":
        "Phone number must have 10 digits,its need to be only numbers",
      "string.max": "Phone number must not exceed 10 digits",
    }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "Email Address is required",
    "string.email": "Email must be a valid email address",
  }),
  password: Joi.string()
    .min(8)
    .max(32)
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_*]).{8,32}$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must not exceed 32 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter and one special character",
    }),
  imgUrl: Joi.string().required().messages({
    "string.empty": "Image Link is Required",
  }),
  imgAlt: Joi.string().required().messages({
    "string.empty": "Image Description is Required",
  }),
  state: Joi.string().required().messages({
    "string.empty": "State is Required",
  }),
  country: Joi.string().required().messages({
    "string.empty": "County is Required",
  }),
  street: Joi.string().required().messages({
    "string.empty": "Street is Required",
  }),
  city: Joi.string().required().messages({
    "string.empty": "City is Required",
  }),
  houseNumber: Joi.string().required().messages({
    "string.empty": "House Number is Required",
  }),
  zip: Joi.string().required().messages({
    "string.empty": "Zip is Required",
  }),
});
export default schema;


