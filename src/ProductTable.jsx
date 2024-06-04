import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function ProductTable({ setSelectedProducts }) {
  const data = useSelector((state) => state.category.products);
  const isLoading = useSelector((state) => state.category.isLoading);
  const [products, setProducts] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    let columnArray = [];
    const newDataArray = data.map((item) => {
      let newData = {};
      let tmpColumn;

      for (const key in item) {
        if (key == 'imagesrc') {
          tmpColumn = {
            field: key,
            headerName: key,
            width: 160,
            renderCell: () => (
              <img src={item[key]} alt="Product" style={{ width: '100%' }} />
            ),
          };
        }
        if (key == 'title') {
          tmpColumn = {
            field: key,
            headerName: key,
            width: 760,
          };
        } 
        else {
          tmpColumn = {
            field: key,
            headerName: key,
            width: 160,
          };
        }

        newData[key] = item[key];
      }
      columnArray.push(tmpColumn);
      return newData;
    });
    setColumns(columnArray);
    setProducts(newDataArray);
    console.log('columnArray>>>>>>>', columnArray);
  }, [data]);
  function handleSelectionModelChange(selectionModel) {
    console.log(selectionModel);
    const result = products.filter((row) => selectionModel.includes(row.id));
    setSelectedProducts(result);
    // console.log(result);
  }
  return (
    <div style={{ height: 400, width: '60vw' }}>
      <DataGrid
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        loading={isLoading}
        onRowSelectionModelChange={handleSelectionModelChange}
        style={{
          backgroundColor: 'rgb(164,245,247)',
          opacity: 0.8,
        }}
      />
    </div>
  );
}
