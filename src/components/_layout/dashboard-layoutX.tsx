'use client'
import React, { useState, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './Main';

const DRAWER_OPEN_WIDTH = '240px';
const DRAWER_CLOSED_WIDTH = '64px';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSelectMenu = (menu: string) => {
    setSelectedMenu(menu);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Header onToggleSidebar={handleToggleSidebar} />
      <Sidebar open={sidebarOpen} onToggle={handleToggleSidebar} selectedMenu={selectedMenu} onSelectMenu={handleSelectMenu} />
      <MainContent>{children}</MainContent>
    </div>
  );
}