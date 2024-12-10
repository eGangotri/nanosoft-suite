'use client';

import MainLayout from '@/components/_layout/main-layout'
import AdminDashboard from '@/components/dashboard/AdminDashboard/page'
import { loggedInState, loggedUser, loggedUserRole } from '@/components/recoliConsts';
import { useRecoilState } from 'recoil';
import { isAdminOrSuperAdmin } from '@/utils/utils';
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard';
import '../styles/globals.css';


export default function Dashboard() {
  const [_isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);
  const [_loggedUser, setLoggedUser] = useRecoilState(loggedUser);
  const [_loggedUserRole, setLoggedUserRole] = useRecoilState(loggedUserRole);
  return (
    <MainLayout>
      {_isLoggedIn ?
       (isAdminOrSuperAdmin(_loggedUserRole) ? <AdminDashboard /> : <EmployeeDashboard />)
      : <h1>Not Authorized</h1>}
    </MainLayout>
  )
}