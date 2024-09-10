import React from 'react';
import { BsFileEarmarkText } from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckArrowRight, faUser } from "@fortawesome/free-solid-svg-icons";
import priceListImage from './../images/financial_8705655.svg';
import logOutImage from './../images/logOut.svg';


export const SidebarData = [
  {
    title: 'MY MOVES',
    path: '/',
    icon: <FontAwesomeIcon icon={faTruckArrowRight} className='iconTruckRange'/>,
    cName: 'nav-text'
  },
  {
    title: 'MY PROFILE',
    path: '/reports',
    icon: <FontAwesomeIcon icon={faUser} className='iconRange'/>,
    cName: 'nav-text'
  },
  {
    title: 'GET QUOTE',
    path: '/products',
    icon: <img src={priceListImage} className='iconTruckRange'/>,
    cName: 'nav-text'
  },
  {
    title: 'LOGOUT',
    path: '/team',
    icon: <img src={logOutImage} className='iconRange'/>,
    cName: 'nav-text'
  }
];
