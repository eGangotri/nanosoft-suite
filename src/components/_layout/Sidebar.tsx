import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  selectedMenu: string;
  onSelectMenu: (menu: string) => void;
}

const DRAWER_OPEN_WIDTH = '240px'
const DRAWER_CLOSED_WIDTH = '64px'
const SIDEBAR_WIDTH_OPEN = 'w-60'
const SIDEBAR_WIDTH_CLOSED = 'w-16'
// : 
const Sidebar: React.FC<SidebarProps> = ({ open, onToggle, selectedMenu, onSelectMenu }) => {
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? DRAWER_OPEN_WIDTH : DRAWER_CLOSED_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_OPEN_WIDTH : DRAWER_CLOSED_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <IconButton onClick={onToggle}>
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      <List>
        {['Dashboard', 'Products', 'Settings'].map((text) => (
          <ListItem button key={text} selected={selectedMenu === text} onClick={() => onSelectMenu(text)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;