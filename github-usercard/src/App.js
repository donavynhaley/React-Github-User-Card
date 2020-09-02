import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: "donavynhaley",
      isLoaded: false,
      error: null,
      data: [],
      followerData: [],
      nameInput: "",
    };
  }
  fetchProfile() {
    axios
      .get(`https://api.github.com/users/${this.state.profile}`)
      .then((res) => {
        this.setState({ data: res.data });
        this.fetchFollowers();
        console.log(res);
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }
  fetchFollowers() {
    axios
      .get(`https://api.github.com/users/${this.state.profile}/followers`)
      .then((res) => {
        this.setState({ followerData: res.data });
        console.log(res);
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }
  componentDidMount() {
    this.fetchProfile();
  }
  handleChange(e) {
    this.setState({
      nameInput: e.target.value,
    });
  }
  handleSubmit(e) {
    this.setState({
      profile: this.state.nameInput,
    });
    this.setState({
      nameInput: "",
    });
    this.fetchProfile();
  }

  render() {
    if (this.state.data.length == 0) {
      return <div>Loading</div>;
    }
    const { error, isLoaded, data, nameInput, followerData } = this.state;
    return (
      <div className="App">
        <h1>Github Usercard</h1>
        <div className="profile-container">
          <div>
            <h2>{data.name}</h2>
          </div>
          <div className="profile-pic">
            <img src={data.avatar_url} />
          </div>
          <div className="profile-bio">
            <h3>Bio</h3>
            <p>{data.bio}</p>
          </div>
          <div className="profile-followers">
            {followerData.map((follower) => {
              return (
                <div className="follower">
                  <a href="test">
                    <img src={follower.avatar_url} />
                  </a>
                </div>
              );
            })}
          </div>
          <div className="profile-input">
            <label>
              <TextField
                type="text"
                value={nameInput}
                placeholder="Change Profile"
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
            </label>
            <Button
              color="primary"
              className="profile-button"
              onClick={(e) => this.handleSubmit(e)}
            >
              Change
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
