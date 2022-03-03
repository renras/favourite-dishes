import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./Form.module.css";
import AppContext from "../../context/AppContext";

type IFormInput = {
  title: string;
  imgUrl: string;
  description: string;
  rating: number;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { state, dispatch } = useContext(AppContext);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // add food
    dispatch({
      type: "ADD_DISH",
      payload: {
        id: state.dishes.length,
        name: data.title,
        image: data.imgUrl,
        description: data.description,
        rating: data.rating,
      },
    });

    // close modal
    dispatch({ type: "TOGGLE_MODAL", payload: false });

    document.documentElement.style.setProperty("--overflow", "auto");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="title"
        {...register("title", {
          required: true,
          pattern: /^[a-zA-z]+(\s[a-zA-z]+)*$/g,
        })}
      />
      {errors.title?.type === "required" && <p>Title is required</p>}
      {errors.title?.type === "pattern" && (
        <p>
          Title should contain only letters, and a single space between each
          word.
        </p>
      )}
      <input
        placeholder="url of image"
        {...register("imgUrl", {
          required: true,
          pattern:
            /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        })}
      />
      {errors.imgUrl?.type === "required" && <p>Image url is required</p>}
      {errors.imgUrl?.type === "pattern" && (
        <p>Enter a valid url. Only accepts images in jpg/png format.</p>
      )}
      <input
        placeholder="description"
        {...register("description", {
          required: true,
          pattern: /^[a-zA-z0-9]+(\s[a-zA-z0-9]+)*\.?$/g,
        })}
      />
      {errors.description?.type === "required" && (
        <p>Description is required</p>
      )}
      {errors.description?.type === "pattern" && (
        <p>
          Description should contain only letters, and a single space between
          each word.
        </p>
      )}
      <input
        placeholder="rating"
        {...register("rating", { required: true, pattern: /^[1-5]$/ })}
      />
      {errors.rating?.type === "required" && <p>Rating is required</p>}
      {errors.rating?.type === "pattern" && <p>Pick a number from 1 to 5</p>}
      <input type="submit" />
    </form>
  );
};

export default Form;
