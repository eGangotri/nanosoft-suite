'use client';

import MainLayout from '@/components/_layout/main-layout'
import AdminDashboard from '@/components/dashboard/AdminDashboard/page'
import { isLoggedInState, loggedUser, loggedUserEmployee, loggedUserEmployeeId, loggedUserRole } from '@/components/recoilConsts';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isAdminOrSuperAdmin } from '@/utils/utils';
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard';
import '../styles/globals.css';
import { Typography } from '@mui/material';


export default function Dashboard() {
  const [_isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [_loggedUser, setLoggedUser] = useRecoilState(loggedUser);
  const [_loggedUserRole, setLoggedUserRole] = useRecoilState(loggedUserRole);
  const [_loggedUserEmployee, setLoggedUserEmployee] = useRecoilState(loggedUserEmployee);
  const [_loggedUserEmployeeId, setLoggedUserEmployeeId] = useRecoilState(loggedUserEmployeeId);
  const __loggedUserRole = useRecoilValue(loggedUserRole) // useRecoilState(isLoggedInState);

  return (
    <MainLayout>
      <>
        <Typography>{_isLoggedIn ? "YES" : "No"}
          -{_loggedUser}
          ---{__loggedUserRole}---
          {_loggedUserRole}
          {_loggedUserEmployeeId}
          ==={JSON.stringify(_loggedUserEmployee)}===</Typography>
        {_isLoggedIn ?
          (isAdminOrSuperAdmin(_loggedUserRole) ? <AdminDashboard /> : <EmployeeDashboard employeeData={_loggedUserEmployee} />)
          : <h1>Not Authorized</h1>}
      </>
    </MainLayout>
  )
}