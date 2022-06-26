import React from "react";
import { Link } from "react-router-dom";
import Image from "../../assest/Todo.jpeg"
import classes from "./Welcome.module.css";
import Card from "../UI/Card";

const Welcome = () => {
  return (
    <Card >
    <div className={classes.main}>
    <h3 >Welcome Back!</h3>
    <img src={Image} alt=""></img>
    <div className={classes.btn1}>
      <Link to="/login">
      <button type="button" class="btn p-2  btn-dark">Login</button>
      </Link>
      <Link to="/signup">
      <button type="button" class="btn  p-2 btn-dark">Signup</button>
      </Link>
      </div>
      </div>
      
    </Card>
  );
};

export default Welcome;
