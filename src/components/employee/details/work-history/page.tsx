'use client'

import React, { useState, useEffect } from 'react';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns'
import { formatStringAsDate } from '@/utils/StringUtils';

interface ChartData {
    month: string;
    remainingDays: number;
}

const columns: GridColDef[] = [
    { field: 'jobTitle', headerName: 'Job Title', width: 200 },
    {
        field: 'startDate',
        headerName: 'Start Date',
        width: 130,
        renderCell: (params) => format(new Date(params.value), 'MM/dd/yyyy'),
    },
    {
        field: 'endDate',
        headerName: 'End Date',
        width: 130,
        renderCell: (params) => params.value ? format(new Date(params.value), 'MM/dd/yyyy') : 'Present',
    },
    { field: 'department', headerName: 'Department', width: 150 },
    {
        field: 'responsibilities',
        headerName: 'Responsibilities',
        width: 300,
        renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                {params.value}
            </div>
        ),
    },
    {
        field: 'technologiesUsed',
        headerName: 'Technologies Used',
        width: 200,
        renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                {params.value}
            </div>
        ),
    },
]

export default function EmployeeWorkHistoryListPage({ initialData }: { initialData: EmployeeWorkHistory[] }) {
    const [workHistory, setWorkHistory] = useState<EmployeeWorkHistory[]>([]);
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setWorkHistory(initialData);
            } catch (error) {
                console.error('Error fetching leave balances:', error);
            }
        };
        if (initialData?.length > 0) {
            fetchData();
        }
    }, [initialData]);

    return (
        initialData && <>


            <Tabs value={activeTab} onChange={handleTabChange} aria-label="work history tabs">
                <Tab label="List View" />
                <Tab label="Grid View" />
            </Tabs>


            <Box sx={{ mt: 2 }}>
                {activeTab === 0 && (
                    <>
                        {workHistory?.map((entry: EmployeeWorkHistory) => (
                            <Box key={entry?.id} mb={2}>
                                <Typography variant="subtitle1">{entry?.jobTitle}</Typography>
                                <Typography>
                                    <strong>Period:</strong> {formatStringAsDate(entry?.startDate)} - {entry?.endDate ? formatStringAsDate(entry?.endDate) : 'Present'}
                                </Typography>
                                <Typography><strong>Department:</strong> {entry?.department || 'N/A'}</Typography>
                                <Typography><strong>Responsibilities:</strong> {entry?.responsibilities || 'N/A'}</Typography>
                                <Typography><strong>Technologies:</strong> {entry?.technologiesUsed || 'N/A'}</Typography>
                            </Box>
                        ))}
                    </>
                )}
                {activeTab === 1 && (
                    <Box sx={{ height: 400, width: '100%', mb: 4 }}>
                        <DataGrid
                            rows={workHistory}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                        />
                    </Box>
                )}
            </Box>
        </>
    );
}
