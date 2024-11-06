'use client'
import React from 'react'
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  category: string
  price: number
}

const products: Product[] = [
  { id: 1, name: 'Product 1', category: 'Category A', price: 19.99 },
  { id: 2, name: 'Product 2', category: 'Category B', price: 29.99 },
  { id: 3, name: 'Product 3', category: 'Category A', price: 39.99 },
]

export default function ProductList() {
  return (
    <div> 
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">Product List</Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button component={Link} href="/products/add" variant="contained" color="primary">
          Add New Product
        </Button>
      </Box>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}