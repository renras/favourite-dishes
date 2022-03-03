import { useState, useRef } from "react";

import Image from "next/image";
import styles from "./Card.module.css";
import GoBackButton from "../GoBackButton/GoBackButton";

interface Props {
  name: string;
  image: string;
  description: string;
  rating: number;
  placeholder: string;
}

const Card = ({ name, image, description, rating, placeholder }: Props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const imgClickHandler = () => {
    if (imgRef.current && !isFullScreen) {
      imgRef.current.style.position = "fixed";
      imgRef.current.style.left = "0";
      imgRef.current.style.top = "0";
      imgRef.current.style.width = "100%";
      imgRef.current.style.height = "100%";
      imgRef.current.style.zIndex = "1";
    }
  };

  const goBackHandler = () => {
    if (imgRef.current && isFullScreen) {
      imgRef.current.style.width = "200px";
      imgRef.current.style.height = "200px";
      imgRef.current.style.zIndex = "0";
      setIsFullScreen(false);
    }
    setTimeout(() => {
      if (imgRef.current && isFullScreen) {
        imgRef.current.style.position = "relative";
      }
    }, 800);
  };

  return (
    <>
      {isFullScreen && (
        <GoBackButton clickHandler={goBackHandler} animate={true} />
      )}
      <div className={styles.card}>
        <div
          className={styles.imgWrapper}
          onClick={() => setIsFullScreen(true)}
        >
          <div ref={imgRef} className={styles.img} onClick={imgClickHandler}>
            <Image
              src={image}
              alt={name}
              layout="fill"
              placeholder="blur"
              blurDataURL={placeholder}
            />
          </div>
        </div>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Rating: {rating}</p>
      </div>
    </>
  );
};

export default Card;
