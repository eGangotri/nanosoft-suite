'use client'

import React from 'react'
import { Typography, TextField, Button, Box } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function AddProduct() {
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission logic here
    console.log('Product added')
    // Redirect to product list after submission
    router.push('/products')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h5" gutterBottom>
        Add New Product
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Product Name"
        name="name"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="category"
        label="Category"
        name="category"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="price"
        label="Price"
        name="price"
        type="number"
        inputProps={{ min: 0, step: 0.01 }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Add Product
      </Button>
    </Box>
  )
}