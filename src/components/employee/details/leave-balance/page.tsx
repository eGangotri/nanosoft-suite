'use client'

import React, { useState, useEffect } from 'react';
import { Card, Typography, Box, Tabs, Tab } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LineChart, ChartsXAxis, ChartsYAxis } from '@mui/x-charts';

interface ChartData {
    month: string;
    remainingDays: number;
}

interface EmployeeLeaveBalance {
    id: number;
    LeaveType: { name: string };
    totalEntitlement: number;
    usedDays: number;
    remainingDays: number;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`leave-balance-tabpanel-${index}`}
            aria-labelledby={`leave-balance-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
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
    const [tabValue, setTabValue] = useState(0);

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

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        initialData && (
            <Card>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="leave balance tabs">
                        <Tab label="Table View" id="leave-balance-tab-0" aria-controls="leave-balance-tabpanel-0" />
                        <Tab label="Chart View" id="leave-balance-tab-1" aria-controls="leave-balance-tabpanel-1" />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ height: 400, width: '100%' }}>
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
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
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
                </TabPanel>
            </Card>
        )
    );
}

