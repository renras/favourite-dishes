import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useForm, SubmitHandler } from "react-hook-form";
import isURL from "validator/lib/isURL";
import { isValidPhoneNumber } from "libphonenumber-js";

import styles from "./Form.module.css";

interface IFormInput {
  title: string;
  imgUrl: string;
  description: string;
  rating: number;
  phone?: string;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { state, dispatch } = useContext(AppContext);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch({
      type: "ADD_DISH",
      payload: {
        id: state.dishes.length + 1,
        name: data.title,
        image: data.imgUrl,
        description: data.description,
        rating: data.rating,
        phone: data.phone,
      },
    });
    dispatch({ type: "SET_INPUT_TEXT", payload: "" });
    dispatch({ type: "FILTER_DISHES" });
    dispatch({ type: "TOGGLE_MODAL", payload: false });

    document.documentElement.style.setProperty("--overflow", "auto");
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      data-testid="form"
    >
      <input
        type="text"
        placeholder="title"
        {...register("title", {
          required: true,
        })}
      />
      {errors.title?.type === "required" && <p>Title is required</p>}
      <input
        type="text"
        placeholder="url of image"
        {...register("imgUrl", {
          required: true,
          validate: (value) => isURL(value),
        })}
      />
      {errors.imgUrl?.type === "required" && <p>Image url is required</p>}
      {errors.imgUrl?.type === "validate" && <p>Enter a valid url.</p>}
      <input
        type="text"
        placeholder="description"
        {...register("description", {
          required: true,
        })}
      />
      {errors.description?.type === "required" && (
        <p>Description is required</p>
      )}
      <input
        type="number"
        placeholder="rating"
        {...register("rating", { required: true, min: 1, max: 5 })}
      />
      {errors.rating?.type === "required" && <p>Rating is required</p>}
      {errors.rating?.type === ("min" || "max") && (
        <p>Pick a number from 1 to 5</p>
      )}
      <input
        type="tel"
        placeholder="phone number"
        {...register("phone", {
          required: false,
          validate: {
            isValidPhoneNumber: (value) =>
              isValidPhoneNumber(value as string, "PH") || value === "",
          },
        })}
      />
      {errors.phone?.type === "isValidPhoneNumber" && (
        <p>Enter a valid phone number.</p>
      )}
      <input type="submit" />
    </form>
  );
};

export default Form;
