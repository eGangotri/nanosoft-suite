'use client'

import React, { useState } from 'react'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import Link from 'next/link'
import { getMenuItemsForRole, menuItems } from './menu-items' // You'll need to create this file with the menu structure
import { NANOSOFT_ROLES } from '@/globalConstants'

interface SidebarProps {
  sidebarOpen: boolean
  isMobile: boolean
  session: any
  pathname: string
}

export default function Sidebar({ sidebarOpen, isMobile, session, pathname }: SidebarProps) {
  const [productsOpen, setProductsOpen] = useState(false)

  const handleProductsClick = () => {
    setProductsOpen(!productsOpen)
  }

  const menusItemsPerRole = getMenuItemsForRole(session?.user?.role)
  const drawer = (
    <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-60' : 'w-16'} overflow-hidden`}>
      <List>
        {menusItemsPerRole.map((item) => (
          <React.Fragment key={item.text}>
            <ListItemButton
              component={item.route ? Link : 'div'}
              href={item.route || '#'}
              onClick={item.subItems ? handleProductsClick : undefined}
              className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'px-4' : 'px-2 justify-center'}`}
            >
              <ListItemIcon className={sidebarOpen ? '' : 'min-w-0 mr-0'}>
                {item.icon}
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary={item.text} />}
              {item.subItems && sidebarOpen && (productsOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            {item.subItems && sidebarOpen && (
              <Collapse in={productsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.text}
                      component={Link}
                      href={subItem.route || '#'}
                      className="pl-8"
                    >
                      <ListItemIcon>
                        {subItem.icon}
                      </ListItemIcon>
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  )

  return (
    <>
      <Drawer
        variant="permanent"
        open={sidebarOpen}
        className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-60' : 'w-16'} hidden sm:block`}
        sx={{
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? '240px' : '64px',
            overflowX: 'hidden',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={() => {}} // You'll need to pass a function to close the sidebar on mobile
        ModalProps={{
          keepMounted: true,
        }}
        className="block sm:hidden"
        sx={{
          '& .MuiDrawer-paper': { width: '240px' },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}