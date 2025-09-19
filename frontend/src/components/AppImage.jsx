import React from "react";

function Image({
  src = "/assets/images/sir.jpg",
  alt = "Samir sir",
  className = "",
  ...props
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.src = "/assets/images/samirsir.JPG";
      }}
      {...props}
    />
  );
}

export default Image;
