import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addProject } from "../../store/slices/projectSlice";
import { AppDispatch } from "../../store/index";
import { useNavigate } from "react-router-dom";
import {
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiMail,
  FiPhone,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { Project } from "@/types/types";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  clientName: Yup.string().required("First name is required"),
  clientSurname: Yup.string().required("Last name is required"),
  clientPhone: Yup.string().required("Phone number is required"),
  clientEmail: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  requestedBudgetLower: Yup.number()
    .positive("Must be positive")
    .nullable()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Minimum budget is required"),
  requestedBudgetUpper: Yup.number()
    .positive("Must be positive")
    .nullable()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Maximum budget is required")
    .moreThan(
      Yup.ref("requestedBudgetLower"),
      "Maximum budget must be greater than minimum budget"
    ),
  deadline: Yup.date().required("Deadline is required"),
});

interface FormValues {
  title: string;
  description: string;
  clientName: string;
  clientSurname: string;
  clientPhone: string;
  clientEmail: string;
  requestedBudgetLower: string;
  requestedBudgetUpper: string;
  deadline: string;
}

const QuoteRequestForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const navigate = useNavigate();
  const initialValues: FormValues = {
    title: "",
    description: "",
    clientName: "",
    clientSurname: "",
    clientPhone: "",
    clientEmail: "",
    requestedBudgetLower: "",
    requestedBudgetUpper: "",
    deadline: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    setSubmitStatus("loading");
    try {
      const projectData: Omit<Project, "id"> = {
        ...values,
        requestedBudget: {
          lower: parseFloat(values.requestedBudgetLower),
          upper: parseFloat(values.requestedBudgetUpper),
        },
      };
      await dispatch(addProject(projectData)).unwrap();
      setSubmitStatus("success");
      resetForm();
      setTimeout(() => setSubmitStatus("idle"), 5000);
      navigate("/projects");
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting quote request:", error);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-[90vw] md:w-[50vw] p-6 mx-auto rounded-lg">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Enter title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              rows={5}
              placeholder="Enter your description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="clientName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <Field
                  type="text"
                  id="clientName"
                  name="clientName"
                  placeholder="John"
                  className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <ErrorMessage
                name="clientName"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <div>
              <label
                htmlFor="clientSurname"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <Field
                  type="text"
                  id="clientSurname"
                  name="clientSurname"
                  placeholder="Doe"
                  className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <ErrorMessage
                name="clientSurname"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4">
            <div>
              <label
                htmlFor="clientPhone"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <Field
                  type="tel"
                  id="clientPhone"
                  name="clientPhone"
                  placeholder="+1 (555) 000-0000"
                  className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <ErrorMessage
                name="clientPhone"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <div>
              <label
                htmlFor="clientEmail"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <Field
                  type="email"
                  id="clientEmail"
                  name="clientEmail"
                  placeholder="john@example.com"
                  className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <ErrorMessage
                name="clientEmail"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4">
            <div>
              <label
                htmlFor="requestedBudgetLower"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Minimum Budget
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <Field
                  type="number"
                  id="requestedBudgetLower"
                  name="requestedBudgetLower"
                  placeholder="0"
                  className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <ErrorMessage
                name="requestedBudgetLower"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <div>
              <label
                htmlFor="requestedBudgetUpper"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Maximum Budget
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <Field
                  type="number"
                  id="requestedBudgetUpper"
                  name="requestedBudgetUpper"
                  placeholder="1000"
                  className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <ErrorMessage
                name="requestedBudgetUpper"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="deadline"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Deadline
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <Field
                type="date"
                id="deadline"
                name="deadline"
                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <ErrorMessage
              name="deadline"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === "loading"}
              className={`${
                isSubmitting || submitStatus === "loading"
                  ? "bg-blue-300"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out`}
            >
              {submitStatus === "loading" ? "Submitting..." : "Submit"}
            </button>
          </div>
          {submitStatus === "success" && (
            <div className="mt-4 p-2 bg-green-100 text-green-700 rounded flex items-center">
              <FiCheckCircle className="mr-2" />
              Quote request submitted successfully!
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 rounded flex items-center">
              <FiAlertCircle className="mr-2" />
              An error occurred while submitting the quote request. Please try
              again.
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default QuoteRequestForm;
