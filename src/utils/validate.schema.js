import * as yup from "yup";


export const validateSchema = async (schema, data, res) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return true;
  } catch (err) {
    const error = err.inner.reduce((acc, curr) => {
      acc[curr.path] = curr.message;
      return acc;
    }, {});
    res.status(400).json({ error });
    return false; 
  }
};
