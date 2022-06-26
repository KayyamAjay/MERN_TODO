import {useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Card from '../UI/Card';
import classes from './SignUp.module.css';
const SignUp = () => {
    // const [enteredFirstName, SetEnteredFirstName]  = useState('');
    // const [enteredLastName, SetEnteredLastName]  = useState('');
    const [userexists,setuserExists] = useState(false);
    const [enteredEmail, SetEnteredEmail]  = useState('');
    const [enteredPassword, SetEnteredPassword]  = useState('');
    const navigate = useNavigate();

    // const firstNameChangeHandler = event => {
    //     SetEnteredFirstName(event.target.value)
    // }
    // const lastNameChangeHandler = event => {
    //     SetEnteredLastName(event.target.value)
    // }
    const emailChangeHandler = event => {
        SetEnteredEmail(event.target.value)
    }
    const passwordChangeHandler = event => {
        SetEnteredPassword(event.target.value)
    }
    const sendDatatoDB= async(data)=>{
        const response = await fetch("http://localhost:2000/api/users/signup", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          })
        const responsedata = await response.json();
        console.log(responsedata);
        if(responsedata.message){
            setuserExists(true);
        }
        console.log(responsedata.user._id);
        navigate(`/${responsedata.user._id}/task`)


    }
    const submitHandler = event => {
        event.preventDefault();
        const data ={
            email:enteredEmail,
            password:enteredPassword
        }
        sendDatatoDB(data);
    }
    

    
    return (
        <Card className={classes.main}>
            <h1 className={classes.heading}>SignUp</h1>
        <form onSubmit={submitHandler} className={classes.form}>
            {/* <div className={classes.firstname}>
            <label htmlFor="firstname">FirstName</label><br />
            <input name='firstname' type='text' id={classes.fname} onChange = {firstNameChangeHandler} ></input>
            </div>
            <div className={classes.lastname}>
            <label htmlFor="lastname">LastName</label><br />
            <input name='lastname' type='text' id={classes.lname} onChange = {lastNameChangeHandler}></input>
            </div> */}
            <div className={classes.email}>
            <input name='email' placeholder='Email' type='email' id={classes.email} onChange = {emailChangeHandler}></input>
            </div>
            <div className={classes.password}>
            <input name='password' type='password' placeholder='Password' id={classes.password} onChange = {passwordChangeHandler}></input>
            </div>
            <div >
            {!userexists?<button className={classes.btn}>SignUp</button>:<p>User Already Exists Please login</p>}
            <p>Already Subscribed? <Link to="/Login">Login</Link></p>
            </div>
        </form>
        </Card>
    )
}

export default SignUp;