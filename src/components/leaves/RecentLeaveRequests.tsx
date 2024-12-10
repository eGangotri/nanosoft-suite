'use client';

import { fetchLeavesForEmployee, getLeaveTypeNameById } from '@/services/leaveService';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Leave } from './types';
import { GridValueFormatter } from '@mui/x-data-grid';

export default function RecentLeaveRequests() {
  const [recentRequests, setRecentRequests] = useState<Leave[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const leaves = await fetchLeavesForEmployee(1);
      setRecentRequests(leaves);
    };
    fetchData();
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'leaveTypeId',
      headerName: 'Type',
      width: 190,
      renderCell: (params: any) => <Typography>{getLeaveTypeNameById(params?.value)}</Typography>
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 130,
      renderCell: (params: any) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 130,
      renderCell: (params: any) => new Date(params.value).toLocaleDateString()
    },
    { field: 'status', headerName: 'Status', width: 130 },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Recent Leave Requests
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={recentRequests}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </>
  );
}

