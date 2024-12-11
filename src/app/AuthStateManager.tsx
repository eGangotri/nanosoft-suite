"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState, loggedUser, loggedUserEmployee, loggedUserEmployeeId, loggedUserId, loggedUserRole } from '@/components/recoilConsts';
import { getEmployeeByUserId } from '@/services/UserService';
import { createEmptyEmployee } from './employee/employee/EmployeeUtil';

export function AuthStateManager() {
  const { data: session, status } = useSession();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setLoggedRole = useSetRecoilState(loggedUserRole);
  const setLoggedUserName = useSetRecoilState(loggedUser);
  const setLoggedUserId = useSetRecoilState(loggedUserId);
  const setLoggedUserEmployeeId = useSetRecoilState(loggedUserEmployeeId);
  const setLoggedUserEmployee = useSetRecoilState(loggedUserEmployee);

  const emptyData = createEmptyEmployee();
  const [employeeInSession, setEmployeeInSession] = useState<Employee>(emptyData);

  const getEmployeeCorrespondingToUser = async () => {
    if (session) {
      if (employeeInSession && employeeInSession.id > 0) {
        return employeeInSession;
      }
      else {
        const data = await getEmployeeByUserId(session.user.id)
        if (data && data?.id > 0) {
          setEmployeeInSession(data as Employee);
        }
        return data;
      }
    }
  }

  useEffect(() => {
    const doCheck = async () => {
      if (status === 'authenticated' && session) {
        setIsLoggedIn(true);
        setLoggedRole(`${session?.user?.role}`);
        setLoggedUserName(`${session?.user?.name}`);
        setLoggedUserId(session?.user?.id);
        const _emp = await getEmployeeCorrespondingToUser();
        setLoggedUserEmployee(_emp || emptyData);
        setLoggedUserEmployeeId(_emp?.id || 0);
        console.log(`session.user.role", ${JSON.stringify(session.user)}
        ${JSON.stringify(_emp)}
        `);
      } else {
        setIsLoggedIn(false);
        setLoggedRole("");
        setLoggedUserName("");
        setLoggedUserId("");
        setEmployeeInSession(emptyData);
        setLoggedUserEmployeeId(0);
      }
    }
    doCheck()
  }, [session, status, setIsLoggedIn, setLoggedRole, setLoggedUserName]);

  return null;
}