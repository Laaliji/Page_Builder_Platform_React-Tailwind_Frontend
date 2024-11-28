import React, { useState } from "react";

const ImageInput = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        border: "2px dashed gray",
        position: "relative",
      }}
    >
      {image ? (
        <img
          src={image}
          alt="Uploaded"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            color: "gray",
            fontSize: "14px",
          }}
        >
          Choose image
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          opacity: 0,
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default ImageInput;
