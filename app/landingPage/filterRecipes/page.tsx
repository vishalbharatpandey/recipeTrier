"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const FilterPage = ({ recipes }) => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFilter(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter(event.target.value);
  };

  const filteredProducts = recipes?.filter((product) => {
    return (
      (categoryFilter === "" || product.category === categoryFilter) &&
      (priceFilter === "" || product.price <= parseInt(priceFilter))
    );
  });

  return (
    <div className='mt-5'>
      <Typography
        variant='p'
        mb={4}>
        Filter Recipes
      </Typography>
      <Grid
        container
        spacing={3}>
        <Grid
          item
          xs={6}
          md={4}>
          <Paper
            elevation={50}
            sx={{ padding: 2 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor='category'>Category:</InputLabel>
              <Select
                id='category'
                value={categoryFilter}
                onChange={handleCategoryChange}>
                <MenuItem value=''>All</MenuItem>
                <MenuItem value='electronics'>Electronics</MenuItem>
                <MenuItem value='clothing'>Clothing</MenuItem>
                <MenuItem value='books'>Books</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid
          item
          xs={6}
          md={4}>
          <Paper
            elevation={50}
            sx={{ padding: 2 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor='price'>Price (max):</InputLabel>
              <Select
                type='number'
                id='price'
                value={priceFilter}
                onChange={handlePriceChange}
              />
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default FilterPage;
