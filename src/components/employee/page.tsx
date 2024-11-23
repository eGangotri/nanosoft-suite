'use client'

import { GridColDef, GridRenderCellParams, GridRowClassNameParams, GridValidRowModel } from '@mui/x-data-grid'
import React, { useState, useEffect } from 'react'
import {
  Button,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  MenuItem,
  Menu,
  TextField
} from '@mui/material'
import Link from 'next/link'
import Tooltip from '@mui/material/Tooltip';

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as DeactivateIcon,
  Restore as ActivateIcon,
  MoreVert as MoreVertIcon,
  AccountBalance as BankIcon,
  ContactMail as ContactIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  EventNote as EventNoteIcon,
  FolderOpen,
}
  from '@mui/icons-material';

import { useRouter } from 'next/navigation';
import { initCaps, StyledDataGrid } from './constants'
import { capitalizeFirstLetter } from '@/utils/StringUtils'


export default function EmployeeListPage() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        const firstName = initCaps(row.firstName);
        const middleName = initCaps(row.middleName);
        const lastName = initCaps(row.lastName);
        const fullName = `${firstName} ${middleName} ${lastName}`.trim();
        const midInitial = middleName.length > 0 ? middleName.charAt(0) + ". " : "";
        const withMidInitial = `${firstName} ${midInitial}${lastName}`.trim();
        return (<Tooltip title={`${fullName}`}>
          <span>{withMidInitial}</span>
        </Tooltip>)
      }
    },
    { field: 'designation', headerName: 'Designation', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'mobile', headerName: 'Mobile', width: 150,
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params: any) => {
        return (<>
          <Link href={`/employee/employee/view-employee/${params?.row?.id}`} passHref>
            <IconButton aria-label="view" color="primary">
              <PersonIcon />
            </IconButton>
          </Link>
          <Link href={`/employee/employee/edit-employee?id=${params?.row?.id}`} passHref>
            <IconButton aria-label="edit" color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => handleDelete(params?.row?.id)}
            disabled={loadingStates[`del-${params?.row?.id}`]}
          >
            {loadingStates[`del-${params?.row?.id}`] ? <CircularProgress size={24} /> : <DeleteIcon />}

          </IconButton>

          {params?.row?.active ?
            <IconButton aria-label="deactivate" color="warning"
              onClick={() => handleActivation(params?.row?.id, false)}
              disabled={loadingStates[`deactivate-${params?.row?.id}`]}
            >
              {loadingStates[`deactivate-${params?.row?.id}`] ? <CircularProgress size={24} /> :
                <DeactivateIcon className="h-4 w-4" />
              }
            </IconButton>
            :
            <IconButton aria-label="reactivate" color="success"
              disabled={loadingStates[`reactivate-${params?.row?.id}`]}
              onClick={() => handleActivation(params?.row?.id, true)}
            >
              {loadingStates[`reactivate-${params?.row?.id}`] ? <CircularProgress size={24} /> :
                <ActivateIcon className="h-4 w-4" />
              }
            </IconButton>
          }

        </>)
      }
    },
    {
      field: 'details',
      headerName: 'Details',
      width: 80,
      renderCell: (params: any) => (
        <IconButton size="small" onClick={(e) => handleMenuOpen(e, params.row)}>
          <MoreVertIcon />
        </IconButton>
      ),
    }

  ]
  const router = useRouter();
  const [loadingStates, setLoadingStates] = useState<{ [key: number | string]: boolean }>({})
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, employee: Employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const handleNavigation = (path: string) => {
    handleMenuClose();
    router.push(path);
  };

  let filteredEmployees = employees.filter(employee =>
    employee?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee?.middleName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee?.mobile?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchEmployees = async () => {
    try {
      setLoading(`list`, true);
      const response = await fetch('/api/employee/list')
      if (!response.ok) {
        throw new Error('Failed to fetch employees')
      }
      const data = await response.json()
      setEmployees(data.employees)
      console.log('Employees:', JSON.stringify(data))
      console.log('employees:', JSON.stringify(employees))
      setLoading(`list`, false);
    } catch (error) {
      console.error('Error fetching employees:', error)
      setLoading(`list`, false);
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const setLoading = (id: number | string, isLoading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [id]: isLoading }))
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setLoading(`del-${id}`, true)
      try {
        const response = await fetch(`/api/employee/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ deleted: true }),
        })
        setLoading(`del-${id}`, false)
        if (!response.ok) {
          console.error('Error deleting employee:', response.statusText)
          throw new Error('Failed to delete employee')
        }
        setEmployees(employees.filter(emp => emp.id !== id))
        filteredEmployees = filteredEmployees.filter(emp => emp.id !== id)
        window.alert(`Deletion Successful`)
      } catch (error) {
        setLoading(`del-${id}`, false)
        window.alert(`Error deleting employee:${error}`)
        console.error('Error deleting employee:', error)
      }
    }
  }

  const handleActivation = async (employeeId: number, activate = false) => {
    const action = activate ? 'reactivate' : 'deactivate'
    if (window.confirm(`Are you sure you want to ${action} this employee?`)) {
      setLoading(`${action}-${employeeId}`, true)
      try {
        const response = await fetch(`/api/employee/${employeeId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ active: activate }),
        })
        setLoading(`${action}-${employeeId}`, false)
        if (!response.ok) {
          console.error('Error changing active status:', response.statusText)
          throw new Error('Failed changing active status')
        }
        window.alert(`${capitalizeFirstLetter(action)} Successful`);
        fetchEmployees()

      } catch (error) {
        setLoading(`${action}-${employeeId}`, false)
        window.alert(`Error changing active status for employee:${error}`)
        console.error('Error changing active status for employee:', error)
      }
    }
  }

  const handleDeactivate = async (id: number) => {
    if (window.confirm('Are you sure you want to deactivate this employee?')) {
      setLoading(`deact-${id}`, true)
      try {
        const response = await fetch(`/api/employee/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ active: false }),
        })
        setLoading(`deact-${id}`, false)
        if (!response.ok) {
          console.error('Error deleting employee:', response.statusText)
          throw new Error('Failed to delete employee')
        }
        window.alert(`Deactivation Successful`)
        fetchEmployees()
      } catch (error) {
        setLoading(`deact-${id}`, false)
        window.alert(`Error deactivating employee:${error}`)
        console.error('Error deactivating employee:', error)
      }
    }
  }

  return (
    <Box className="container mx-auto px-4 py-8">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1">Employee List</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <TextField
          label="Search employees"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" startIcon={<AddIcon />}>
          <Link href="/employee/employee/add-employee" passHref>
            Add New Employee
          </Link>
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleNavigation(`/employee/details/hr-details/${selectedEmployee?.id}/`)}>
          <PersonIcon fontSize="small" sx={{ marginRight: 1 }} />HR Details
        </MenuItem>
        <MenuItem onClick={() => handleNavigation(`/employee/details/bank-details/add-edit/${selectedEmployee?.id}?id=${selectedEmployee?.id}`)}>
          <BankIcon fontSize="small" sx={{ marginRight: 1 }} /> Bank Details
        </MenuItem>
        <MenuItem onClick={() => handleNavigation(`/employee/details/contact-info/${selectedEmployee?.id}/`)}>
          <ContactIcon fontSize="small" sx={{ marginRight: 1 }} /> Emergency Contact Info
        </MenuItem>
        <MenuItem onClick={() => handleNavigation(`/employee/details/work-history/${selectedEmployee?.id}/`)}>
          <WorkIcon fontSize="small" sx={{ marginRight: 1 }} /> Work History
        </MenuItem>
        <MenuItem onClick={() => handleNavigation(`/employee/details/leaves/${selectedEmployee?.id}/`)}>
          <EventNoteIcon fontSize="small" sx={{ marginRight: 1 }} /> Leaves
        </MenuItem>
        <MenuItem onClick={() => handleNavigation(`/employee/details/docs/${selectedEmployee?.id}/`)}>
          <FolderOpen fontSize="small" sx={{ marginRight: 1 }} /> Docs
        </MenuItem>
      </Menu>
      <div style={{ height: 400, width: '100%' }}>
        {loadingStates[`list`] ?
          <div className="flex justify-center items-center h-80vh">
            <CircularProgress size={24} />
          </div> :
          <StyledDataGrid
            rows={filteredEmployees}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection={false}
            getRowClassName={(params: GridRowClassNameParams<GridValidRowModel>) =>
              !params.row.active
                ? 'inactive-row'
                : params.indexRelativeToCurrentPage % 2 === 0
                  ? 'even-row'
                  : 'odd-row'
            }
          />
        }

      </div>
    </Box>
  )
}