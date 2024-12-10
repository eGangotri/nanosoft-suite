"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState , loggedUser, loggedUserRole } from '@/components/recoilConsts';

export function AuthStateManager() {
  const { data: session, status } = useSession();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setLoggedRole = useSetRecoilState(loggedUserRole);
  const setLoggedUserName = useSetRecoilState(loggedUser);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      setIsLoggedIn(true);
      setLoggedRole(session.user.role);
      setLoggedUserName(session?.user?.id);
      console.log("session.user.role", JSON.stringify(session.user));
    } else {
      setIsLoggedIn(false);
      setLoggedRole("");
      setLoggedUserName("");
    }
  }, [session, status, setIsLoggedIn, setLoggedRole, setLoggedUserName]);

  return null;
}