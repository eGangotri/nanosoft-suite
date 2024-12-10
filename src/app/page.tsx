'use client';

import MainLayout from '@/components/_layout/main-layout'
import AdminDashboard from '@/components/dashboard/AdminDashboard/page'
import { isLoggedInState, loggedUser, loggedUserRole } from '@/components/recoilConsts';
import { useRecoilState } from 'recoil';
import { isAdminOrSuperAdmin } from '@/utils/utils';
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard';
import '../styles/globals.css';
import { Typography } from '@mui/material';


export default function Dashboard() {
  const [_isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [_loggedUser, setLoggedUser] = useRecoilState(loggedUser);
  const [_loggedUserRole, setLoggedUserRole] = useRecoilState(loggedUserRole);
  return (
    <MainLayout>
      <>
        <Typography>{_isLoggedIn}-{_loggedUser}-{_loggedUserRole}</Typography>
        {_isLoggedIn ?
          (isAdminOrSuperAdmin(_loggedUserRole) ? <AdminDashboard /> : <EmployeeDashboard />)
          : <h1>Not Authorized</h1>}
      </>
    </MainLayout>
  )
}