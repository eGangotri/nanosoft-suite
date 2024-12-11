'use client'

import { atom } from 'recoil';
import { NANOSOFT_ROLES } from '@/globalConstants'

export const isLoggedInState = atom({
    key: 'isLoggedInState',
    default: false,
  });
  
  export const loggedUser = atom({
    key: 'loggedUser',
    default: "",
  });
   
  export const loggedUserId = atom({
    key: 'loggedUserId',
    default: "",
  });
  
  export const loggedUserRole = atom({
    key: 'loggedUserRole',
    default: NANOSOFT_ROLES.EMPLOYEE,
  });
  
  
  export const loggedUserEmployeeId = atom({
    key: 'loggedUserRole',
    default: "",
  });
  
  export const loginToken = atom({
    key: 'loginToken',
    default: "",
  });
  
  export const loggedUserEmployee = atom({
    key: 'loggedUserEmployee',
    default: {} as Employee, 
  });