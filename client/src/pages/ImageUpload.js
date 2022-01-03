import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState(null);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post("http://localhost:3001/image", formData);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div>
      <input type="file" onChange={saveFile} accept=".jpg,.png,.jpeg" />

      <img src={filePreview} alt="Preview" />

      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};

export default ImageUpload;
