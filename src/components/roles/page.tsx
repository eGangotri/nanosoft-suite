"use client"

import { useEffect, useState } from "react"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import { RolesSchema, type Role } from "./schema"

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "code", headerName: "Code", width: 100 },
    { field: "level", headerName: "Level", width: 100 },
]

export default function RolesList() {
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await fetch("/api/roles");
                const data = await res.json();
                setRoles(data);
            } catch (error) {
                console.error("Failed to fetch roles:", error);
            }
        };

        fetchRoles();
    }, []);


    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={roles}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    )
}
