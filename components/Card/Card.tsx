import { useState, useRef, CSSProperties } from "react";

import Image from "next/image";
import styles from "./Card.module.css";

interface Props {
  name: string;
  image: string;
  description: string;
  rating: number;
  placeholder: string;
}

const fullScreenDivStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
};

const closingDivStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "200px",
  height: "200px",
  zIndex: 1,
};

const Card = ({ name, image, description, rating, placeholder }: Props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [divStyle, setDivStyle] = useState<CSSProperties>({});
  const imgRef = useRef<HTMLImageElement>(null);

  const imgClickHandler = () => {
    setDivStyle(fullScreenDivStyle);
  };

  const goBackHandler = () => {
    setIsFullScreen(false);
    setDivStyle(closingDivStyle);
    setTimeout(() => {
      setDivStyle({});
    }, 800);
  };

  return (
    <>
      {isFullScreen && (
        <button className={styles.goBack} onClick={goBackHandler}>
          Go Back
        </button>
      )}
      <div className={styles.card}>
        <div
          className={styles.imgWrapper}
          onClick={() => setIsFullScreen(true)}
        >
          <div
            data-testid="img-wrapper"
            ref={imgRef}
            style={divStyle}
            className={styles.img}
            onClick={imgClickHandler}
          >
            <Image
              src={image}
              alt={name}
              layout="fill"
              placeholder={placeholder ? "blur" : "empty"}
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
