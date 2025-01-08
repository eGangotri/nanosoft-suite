'use client'

import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Container, Typography, Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddIcon from '@mui/icons-material/Add';

interface Claim {
  id: number;
  employeeId: number;
  amount: number;
  description: string;
  date: string;
  status: string;
}

const ClaimsListPage: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const response = await fetch('/api/claims');
      if (!response.ok) {
        throw new Error('Failed to fetch claims');
      }
      const data = await response.json();
      setClaims(data);
    } catch (error) {
      console.error('Error fetching claims:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/claims/edit/${id}`);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'employeeId', headerName: 'Employee ID', width: 130 },
    { field: 'amount', headerName: 'Amount', width: 130, type: 'number' },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'date', headerName: 'Date', width: 130, type: 'date' },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEdit(params.row.id)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box display="flex" alignItems="center" mb={2}>
        <ReceiptLongIcon sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h4" component="h1">
          Claims List
        </Typography>
      </Box>
      <Link href="/claims/add" passHref>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          style={{ marginBottom: '1rem' }}
        >
          Add New Claim
        </Button>
      </Link>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={claims}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          loading={loading}
        />
      </div>
    </Container>
  );
};

export default ClaimsListPage;

