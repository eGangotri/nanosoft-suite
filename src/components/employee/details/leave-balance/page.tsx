'use client'

import React, { useState, useEffect } from 'react';
import { Card, Typography, Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LineChart, ChartsXAxis, ChartsYAxis } from '@mui/x-charts';

interface ChartData {
    month: string;
    remainingDays: number;
}

const columns: GridColDef[] = [
    {
        field: 'LeaveType',
        headerName: 'Leave Type',
        width: 150,
        renderCell: (params) => {
            return params.row.LeaveType?.name
        },
    },
    { field: 'totalEntitlement', headerName: 'Total Entitlement', width: 150, type: 'number' },
    { field: 'usedDays', headerName: 'Used Days', width: 120, type: 'number' },
    { field: 'remainingDays', headerName: 'Remaining Days', width: 150, type: 'number' },
];

export default function EmployeeLeaveBalanceDisplay({ initialData }: { initialData: EmployeeLeaveBalance[] }) {
    const [leaveBalances, setLeaveBalances] = useState<EmployeeLeaveBalance[]>([]);
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLeaveBalances(initialData);

                // Prepare chart data
                const aggregatedData = initialData.reduce((acc: { [key: string]: number }, curr: EmployeeLeaveBalance) => {
                    const month = new Date().toLocaleString('default', { month: 'short' });
                    if (!acc[month]) {
                        acc[month] = 0;
                    }
                    acc[month] += curr.remainingDays;
                    return acc;
                }, {});

                const chartData = Object.entries(aggregatedData).map(([month, remainingDays]) => ({
                    month,
                    remainingDays,
                }));

                setChartData(chartData);
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
            <Box sx={{ height: 400, width: '100%', mb: 4 }}>
                <DataGrid
                    rows={leaveBalances}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </Box>

            <Typography variant="h6" gutterBottom>
                Leave Balance Over Time
            </Typography>

            <Box sx={{ height: 300, width: '100%' }}>
                <LineChart
                    xAxis={[{
                        data: chartData.map(item => item.month),
                        scaleType: 'band',
                    }]}
                    series={[
                        {
                            data: chartData.map(item => item.remainingDays),
                            area: true,
                        },
                    ]}
                    height={300}
                >
                    <ChartsXAxis label="Month" />
                    <ChartsYAxis label="Remaining Days" />
                </LineChart>
            </Box>
        </>
    );
}
