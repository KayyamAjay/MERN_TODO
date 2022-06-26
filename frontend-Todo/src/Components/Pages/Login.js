// import React from "react";
import {  useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import Card from "../UI/Card";
const Login = () => {
  const enteredUseremailid = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function postdata(data) {
    const response = await fetch("http://localhost:2000/api/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const responsedata = await response.json();
    if(responsedata.message === "Succesfully LoggedIn!"){
    const userId = responsedata.existinguser._id;
    console.log(userId);
    navigate(`/${userId}/task`)

    }
    
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      email: enteredUseremailid.current.value,
      password: passwordRef.current.value,
    };
    console.log(data);
    console.log(JSON.stringify(data));
    postdata(data);
  };
  return (
    <Card className={classes.main}>
      <h1 className={classes.heading}>Login</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.username}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id={classes.username}
            ref={enteredUseremailid}
          ></input>
        </div>
        <div className={classes.password}>
          
          <input
            placeholder="Password"
            type="password"
            name="password"
            id={classes.password}
            ref={passwordRef}
          ></input>
        </div>
        <div>
          <button className={classes.btn}>Login</button>
          <p>
            Not Subscribed? <Link to="/Signup">Subscribe Now</Link>
          </p>
        </div>
      </form>
    </Card>
  );
};

export default Login;
