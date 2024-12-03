import { ReactNode } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ContactCardProps {
  children: ReactNode;
  onEdit: () => void;
  onDelete: () => void;
}

export const SectionBodyWithEditDelete = ({ children, onEdit, onDelete }: ContactCardProps) => (
  <div className="mb-4 flex items-center">
    <div className="flex-grow">
      {children}
    </div>
    <div className="flex space-x-2">
      <IconButton
        aria-label="edit"
        className="text-blue-500 hover:text-blue-700"
        onClick={onEdit}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        aria-label="delete"
        className="text-red-500 hover:text-red-700"
        onClick={onDelete}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  </div>
);


