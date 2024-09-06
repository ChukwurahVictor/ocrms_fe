import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email!")
    .required("Email is required!"),
  password: Yup.string().trim().required("Password is required!"),
});

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("First name is required!"),
  lastName: Yup.string().trim().required("Last name is required!"),
  email: Yup.string()
    .trim()
    .email("Invalid email!")
    .required("Email is required!"),
  password: Yup.string()
    .trim()
    .min(7, "Password must be at least 7 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/\d/, "Password must contain at least one number.")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character."
    )
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required!"),
});

export const RequestResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email!")
    .required("Email is required!")
});

export const CreateDepartmentSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required!"),
  description: Yup.string().notRequired(),
});

export const EditDepartmentSchema = Yup.object().shape({
  name: Yup.string().trim(),
  description: Yup.string().notRequired(),
})

export const CreateComplaintSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required!"),
  description: Yup.string().trim().required("Description is required!"),
  categoryId: Yup.string().trim().required("Category is required!"),
});

export const EditComplaintsSchema = Yup.object().shape({
  requestedBy: Yup.string().trim(),
  title: Yup.string().trim(),
  description: Yup.string().trim(),
  priority: Yup.string().trim(),
  status: Yup.string().trim(),
  assignedTo: Yup.string().trim(),
  complaintId: Yup.string().trim(),
});

export const AssignComplaintSchema = Yup.object().shape({
  departmentId: Yup.string().trim().required('Department is required.'),
});

export const UpdateComplaintSchema = Yup.object().shape({
  title: Yup.string().trim().notRequired(),
  description: Yup.string().trim().notRequired(),
  categoryId: Yup.string().trim().notRequired(),
  status: Yup.string().trim().notRequired(),
  priorityLevel: Yup.string().trim().notRequired(),
});

export const EditDetailsSchema = Yup.object().shape({
  firstName: Yup.string().trim(),
  lastName: Yup.string().trim(),
  email: Yup.string().email("Invalid email!").trim(),
});

export const CreateStaffSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('First name is required.'),
  lastName: Yup.string().trim().required('Last name is required.'),
  email: Yup.string().email("Invalid email!").trim(),
  departmentId: Yup.string().trim(),
});

export const CreateAdminSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('First name is required.'),
  lastName: Yup.string().trim().required('Last name is required.'),
  email: Yup.string().email("Invalid email!").trim(),
});

export const CreateCategorySchema = Yup.object().shape({
  name: Yup.string().trim().required('Name is required.'),
  description: Yup.string().trim().notRequired(),
});

export const UpdatePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().trim().required("Name is required."),
  newPassword: Yup.string()
    .trim()
    .min(7, "Password must be at least 7 characters long.").required(),
  confirmNewPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required!"),
});

export const AddFeedbackSchema = Yup.object().shape({
  comment: Yup.string().trim().required("Feedback is required."),
  rating: Yup.string().trim().notRequired(),
});