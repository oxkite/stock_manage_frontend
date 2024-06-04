import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  fetchProducts,
  updateFilterStatus,
  updatePrice,
  updateSelectedPrice,
} from "./store/slices/categorySlice";
import { Toaster } from "react-hot-toast";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProductTable from "./ProductTable";
import { Button, TextField, InputAdornment } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function App() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.categories);
  const filter = useSelector((state) => state.category.filter);
  const [filterStatus, setFilterStatus] = useState(filter);
  const [pricePercentage, setPricePercentage] = useState(95);
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const handleChange = (event) => {
    setSelectedCat(event.target.value);
    const result = category.find(
      (item) => item.category === event.target.value
    );
    dispatch(
      fetchProducts({ id: result.id, higher: filterStatus === "All" ? 0 : 1 })
    );
  };
  const handlePercentChange = (e) => {
    setPricePercentage(e.target.value);
    console.log(e.target.value);
  };
  const handleChangeFilter = (event) => {
    setFilterStatus(event.target.value);
    dispatch(updateFilterStatus(event.target.value));
    const result = category.find((item) => item.category === selectedCat);
    dispatch(
      fetchProducts({
        id: result.id,
        higher: event.target.value === "All" ? 0 : 1,
      })
    );
  };
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const categorySelect = () => {
    const result = category.map((item, index) => (
      <MenuItem value={item.category} key={index}>
        {item.category}
      </MenuItem>
    ));
    return result;
  };

  const handleUpdateClick = () => {
    const result = category.find((item) => item.category === selectedCat);

    const data = {
      percent: pricePercentage,
      category: result.id,
    };
    console.log(data);
    dispatch(updatePrice(data));
  };

  const handleSelectedUpdateClick = () => {
    const data = selectedProducts.map((item) => ({
      proid: item.proid,
      updatePrice: Math.floor((item.oppPrice2 * pricePercentage) / 100),
    }));
    dispatch(updateSelectedPrice(data));
    console.log(data);
  };

  return (
    <>
      <div>
        <hr />
        <h1>Price Management vs Zap Site</h1>
        <Box sx={{ minWidth: 120 }}>
          <FormControl
            sx={{ m: 1, minWidth: 280 }}
            style={{
              backgroundColor: "rgb(164,245,247)",
              opacity: 0.8,
            }}
          >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCat}
              label="Category"
              onChange={handleChange}
              MenuProps={MenuProps}
            >
              {categorySelect()}
            </Select>
          </FormControl>
          <FormControl
            sx={{ m: 1, minWidth: 120 }}
            style={{
              backgroundColor: "rgb(164,245,247)",
              opacity: 0.8,
            }}
          >
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterStatus}
              label="Category"
              onChange={handleChangeFilter}
              MenuProps={MenuProps}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Higher">Higher</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <TextField
              style={{
                backgroundColor: "rgb(164,245,247)",
                opacity: 0.8,
              }}
              label="Price percentage"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              value={pricePercentage}
              onChange={handlePercentChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
                inputProps: {
                  min: 0,
                  max: 100,
                },
              }}
              type="number"
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleUpdateClick}
              sx={{ margin: 1 }}
            >
              Update All
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={handleSelectedUpdateClick}
            >
              Update Selected Products
            </Button>
          </FormControl>
        </Box>
      </div>
      <div className="card">
        <ProductTable setSelectedProducts={setSelectedProducts} />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </>
  );
}

export default App;
