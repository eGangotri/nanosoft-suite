'use client'

import { atom, RecoilRoot } from 'recoil';
import { NANOSOFT_ROLES } from '@/globalConstants'

export const loggedInState = atom({
    key: 'loggedInState',
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
  