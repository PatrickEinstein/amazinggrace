import { render } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "./header.css";
import { Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";
import CartItem from "../cart-icon /cart-icon";
import { SignOut } from "../collectionitems/firebase/firebase.utils";
import CartDropdown from "../cartmenu-dropdown/cartmenu-dropdown";
import { ReactComponent as Logo } from '../../assets/assets.svg'
import { auth } from "../collectionitems/firebase/firebase.utils";
import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import SignIn from '../../components/signin/signin';
import { useNavigate } from "react-router-dom";




const Header = ({hidden}) => {

  const navigate = useNavigate()

  useEffect( ( ) =>{

    console.log('i have mounted')
    console.log(auth.currentUser);
    if(!auth.currentUser){
        navigate(-1)
       }

    return( () =>{
      console.log('byebye')
      console.log(auth.currentUser)
      
    }
    )
    

  },[auth.currentUser])

  return (
    <div className="header">
      <div className="logo-container ">
        <Link to="/" className="links0">
          <Logo className="logo"/> <br/>
          <span className="logo">Amazing Grace Stores</span>
        </Link>
      </div>

      <div className="links">
        <Link to="/shop" className="links0">
          {" "}
          SHOP{" "}
        </Link>

        <Link to="/contact" className="links0">
          {" "}
          CONTACT{" "}
        </Link>

        {auth.currentUser ? 
        
        (
          
      <div
      className="links0"
      onClick = {SignOut}
      style={{ cursor: "pointer" }}>
      SIGN OUT
      </div>
       
        )
        :
        (
        <Link to="/signin" className="links0">
          SIGN IN
        </Link>
        ) 
        }
        <CartItem/>
      </div>

      {hidden ? null :  <CartDropdown/>}
    </div>
  );
};

const mapStateToProps =({user :{ currentUser}, cart: { hidden}}) =>({
currentUser,
hidden
});

export default connect(mapStateToProps)(Header);