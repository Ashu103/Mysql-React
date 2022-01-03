import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
  withRouter,
} from "react-router-dom";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import StateDropdown from "./pages/StateDropdown";
import Registeration from "./pages/Registeration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import ava from "./helpers/ava.jpg";
import axios from "axios";
import Doctor from "./pages/Doctor";
function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false }); //
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    history.push("/");
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to="/createpost">Create Awareness</Link>
            <Link to="/">Home</Link>
            {!authState.status ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registeration">Register</Link>
              </>
            ) : (
              <div className="loggedInContainer">
                <StateDropdown />
                <button onClick={logout}>Logout</button>
                <h1>{authState.username}</h1>
                <img
                  src={ava}
                  alt="ava"
                  style={{
                    backgroundSize: "cover",
                    width: "75px",
                    height: "auto",
                    borderRadius: "50%",
                  }}
                />
              </div>
            )}
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/registeration" exact component={Registeration} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/doctors/:id" exact component={Doctor} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
      <div className="myfoot">
        <h3>CopyRight @2021 Ashu Srivastava</h3>
        <a href="https://twitter.com/AshuSri30628478">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com/ashufuri103/">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
}

export default withRouter(App);
