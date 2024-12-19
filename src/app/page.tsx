'use client';

import MainLayout from '@/components/_layout/main-layout'
import AdminDashboard from '@/components/dashboard/AdminDashboard/page'
import { isLoggedInState, loggedUser, loggedUserEmployee, loggedUserEmployeeId, loggedUserRole } from '@/components/recoilConsts';
import { useRecoilValue } from 'recoil';
import { isAdminOrSuperAdmin } from '@/utils/utils';
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard';
import '../styles/globals.css';
import { Typography } from '@mui/material';


export default function Dashboard() {
  const _isLoggedIn = useRecoilValue(isLoggedInState);
  //const _loggedUserEmployee = useRecoilValue(loggedUserEmployee);
  const __loggedUserRole = useRecoilValue(loggedUserRole);
  const _loggedUserEmployeeId = useRecoilValue(loggedUserEmployeeId);

  return (
    <MainLayout>
      {_isLoggedIn ?
        (isAdminOrSuperAdmin(__loggedUserRole) ? <AdminDashboard /> : <EmployeeDashboard employeeId={_loggedUserEmployeeId} />)
        : <h1>Not Authorized</h1>}
    </MainLayout>
  )
}