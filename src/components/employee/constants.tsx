import { styled } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'

export const initCaps = (str: string) => {
    return str ? str?.charAt(0)?.toUpperCase() + str?.slice(1) : "";
}

export
    const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
        '& .inactive-row': {
            backgroundColor: 'rgba(254, 202, 202, 0.5)', // Light red color for inactive rows
            '&:hover': {
                backgroundColor: 'rgba(254, 202, 202, 0.7)', // Darker red on hover for inactive rows
            },
            '&.Mui-selected': {
                backgroundColor: 'rgba(254, 202, 202, 0.8)', // Even darker red for selected inactive rows
                '&:hover': {
                    backgroundColor: 'rgba(254, 202, 202, 0.9)', // Darkest red on hover for selected inactive rows
                },
            },
        },
        '& .even-row': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)', // Light gray for even rows
        },
        '& .odd-row': {
            backgroundColor: 'rgba(255, 255, 255, 1)', // White for odd rows
        },
        '& .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    }));
