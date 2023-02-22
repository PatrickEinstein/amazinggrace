import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import FormInput from "../form/form";
import Button from "../button/button";
import { Route } from "react-router-dom";
import {
  createUserData,
  auth,
} from "../collectionitems/firebase/firebase.utils";

import "./signup.css";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Navigate } from "react-router-dom";
import SignIn from "../signin/signin";

const SignUp = ( ) => {

  const [ userCredentials, setuserCredentials] = useState({
    displayName: '',
    email:'',
    password: '',
    confirmPassword: ''
  })

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
   

    if (password !== confirmPassword) {
      alert("passwords don't match");
    }

    try {
      createUserWithEmailAndPassword()
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(`created user with mail and pass for ${user}`)
        }).catch((error)=>{
          console.log(`could not create user with email and pass =>${error}`)
        });
      
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await createUserData(user, { displayName });

      setuserCredentials({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }catch (error) {
      console.log(error);
    }
  };
  
  
 const handleChange = (event) => {
    const { name, value } = event.target;
    setuserCredentials({...userCredentials , [name]: value });
  };

  
    
    return (
      <div className="signup">
        <h1 className="title"> I do not have an account </h1>
        <span>Sign up with your email and password</span>
        <form className="signupform" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={handleChange}
            label="Display Name"
            required
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            label="Password"
            required
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            label="Password"
            required
          />
          <Button type="submit" Children="SIGN UP" />
        </form>
      </div>
    );
  }


export default SignUp;
