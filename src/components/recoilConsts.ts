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
  
  export const loggedUserRole = atom({
    key: 'loggedUserRole',
    default: NANOSOFT_ROLES.EMPLOYEE,
  });
  
  export const loginToken = atom({
    key: 'loginToken',
    default: "",
  });
  