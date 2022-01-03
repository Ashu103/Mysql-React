import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import * as Yup from "yup";
const CreatePost = () => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const initialValues = {
    title: "",
    postText: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
  });
  const onSubmit = (data) => {
    if (authState.status) {
      axios
        .post("http://localhost:3001/posts", data, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          history.push("/");
        });
    } else {
      history.push("/login");
    }
  };
  return (
    <div className="craetePostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title:</label>
          <ErrorMessage name="title" component="span" />
          <Field id="inputCreatePost" name="title" placeholder="Title" />

          <label>Post:</label>
          <ErrorMessage name="postText" component="span" />
          <Field id="inputCreatePost" name="postText" placeholder="...Post" />

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
