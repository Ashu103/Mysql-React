import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
const Profile = () => {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [imagepath, setImagePath] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
      setImagePath(response.data.file); //this is path string "uploads\\images\\ijsi5fzb1nbkbhxa2gc1.png-1637746187450.png"
    });
    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username: {username}</h1>
        <img
          style={{ width: "320px", height: "420px" }}
          src={`http://localhost:3001/${imagepath}`}
          alt="Profile"
        />
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="poostt">
              <div className="title">{value.title}</div>
              <div
                className="boodyy"
                onClick={() => {
                  history.push(`/post/${value.id}`);
                }}
              >
                {value.postText}
              </div>
              <div className="footerr">
                <div className="usernamee">{value.username}</div>
              </div>
              <div className="buttons">
                <label> {value.Likes.length}</label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
