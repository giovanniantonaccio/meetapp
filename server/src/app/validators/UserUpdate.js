import { object, string, ref } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      name: string().strict(true),
      email: string().email(),
      oldPassword: string()
        .strict(true)
        .min(6)
        .when('password', (password, field) =>
          password ? field.required() : field
        ),
      password: string()
        .strict(true)
        .min(6),
      confirmPassword: string().when('password', (password, field) =>
        password
          ? field
              .required()
              .oneOf([ref('password')], 'Passwords does not match')
          : field
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation failed', messages: err.inner });
  }
};
