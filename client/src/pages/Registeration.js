import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
const Registeration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();
  const [filePreview, setFilePreview] = useState(null);
  const alert = useAlert();
  const history = useHistory();

  const register = () => {
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    data.append("file", file);
    for (var value of data.values()) {
      console.log(value);
    }
    console.log(data.values);
    axios
      .post("http://localhost:3001/auth", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert.show("User is Registered");
      });
    history.push("/");
  };

  return (
    <div className="formContainer">
      <label>Username: </label>
      <input
        className="inputCreatePost"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password :</label>
      <input
        className="inputCreatePost"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>Image:</label>
      <input
        className="inputCreatePost"
        type="file"
        name="file"
        accept=".jpg,.png,.jpeg"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setFilePreview(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <img
        style={{ height: "200px", width: "200px" }}
        src={filePreview}
        alt="uploadImage"
      />
      <button onClick={register}>RegisterUser</button>
    </div>
  );
};

export default Registeration;
