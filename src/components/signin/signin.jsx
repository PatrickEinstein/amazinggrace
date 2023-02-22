import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import "./signin.css";

import FormInput from "../form/form";

import Button from "../button/button";

import signInWithGoogle from "../collectionitems/firebase/firebase.utils";
import { auth } from "../collectionitems/firebase/firebase.utils";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const SignIn = ( ) =>  {
  const [ userDetails, setuserDetails] = useState({email: '', password :''})
  const { email, password} = userDetails;

  const handleSubmit = async (event, userAuth) => {
    event.preventDefault();
   

    try {
      signInWithEmailAndPassword()
        .then((userDetails) => {
          const user = userDetails.user;
        })
        .catch((error) => {
          console.log(`could not sign in ${error}`);
        });

      await signInWithEmailAndPassword(auth, email, password);

      setuserDetails({...userDetails, email: "", password: "" });
    } catch (error) {
      console.log(error);
      alert("incorrect password");
    }
  };

 const handleChange = (event) => {
    const { name, value } = event.target;
    setuserDetails({...userDetails, [name]: value });
  };

  
    return (
      <div className="signin">
        <h1> I already have an account </h1>
        <span> Sign in with email and password </span>

        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            required
            handleChange={handleChange}
            label="Email"
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            required
            handleChange={handleChange}
            label="Password"
          />

          <div className="clicks">
            <Button type="submit" Children="Sign in" />

            <Button
              className="google"
              onClick={signInWithGoogle}
              Children=" Sign In With Google"
            />
          </div>
        </form>
      </div>
    );
  }


export default SignIn;
//Verygood123
