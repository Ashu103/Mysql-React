import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import BasicAlerts from "./Alert";
import { fontSize } from "@mui/system";
const Home = () => {
  const [listofPosts, setListOfPosts] = useState([]);
  const [search, setSearch] = useState("");
  let history = useHistory();

  const Searching = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data.map((r) => ({ ...r, alert: "" })));
    });
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts((curPosts) => {
          let newPosts = [...curPosts];
          newPosts[newPosts.findIndex((p) => p.id === postId)].alert =
            response.data.msg;
          return newPosts;
        });
        setListOfPosts(
          listofPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };

  return (
    <div>
      <input
        className="searchInput"
        type="text"
        name="searchTerm"
        placeholder="Search"
        value={search}
        onChange={Searching}
      />

      <div>
        {listofPosts
          .filter((value) => {
            if (search === "") {
              return value;
            } else if (
              value.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return value;
            }
          })
          .map((value, key) => {
            return (
              <div
                className="post"
                key={value.id}
                // style={{
                //   backgroundImage: `url(https://drashwinkaruppan.com/wp-content/uploads/2020/07/Depression-All-you-need-to-know.png)`,
                //   backgroundRepeat: "no-repeat",
                //   backgroundPosition: "center",
                //   backgroundSize: "cover",
                //   color: "white",
                //   zIndex: -10,
                // }}
                //ye na kewal url change kar dega balki us url pe jo componet load hona hai woh bh ho jayega
              >
                <div className="title">{value.title}</div>

                <div
                  className="body"
                  onClick={() => history.push(`/post/${value.id}`)}
                >
                  {value.postText}
                </div>
                <div className="footer">
                  <div className="username">
                    <Link to={`/profile/${value.UserId}`}>
                      {value.username}
                    </Link>
                  </div>
                  {localStorage.getItem("accessToken") && (
                    <div>
                      <button
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          likeAPost(value.id);
                        }}
                      >
                        Faced
                        {value.alert && <BasicAlerts msg={value.alert} />}
                      </button>
                      <label>{value.Likes.length}</label>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
