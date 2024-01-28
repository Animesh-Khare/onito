import { Box, FormLabel, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const columns = [
  {
    name: "Name",
    selector: (row: any) => row.firstName,
    sortable: true,
  },
  {
    name: "Age",
    selector: (row: any) => row.age,
    sortable: true,
  },
  {
    name: "Gender",
    selector: (row: any) => row.gender,
    sortable: true,
  },
  {
    name: "Mobile",
    selector: (row: any) => row.mobile,
    sortable: true,
  },
  {
    name: "Id Type",
    selector: (row: any) => row.govtIssuedIdType,
    sortable: true,
  },
  {
    name: "Id Number",
    selector: (row: any) => row.govtIssuedId,
    sortable: true,
  },
  {
    name: "Address",
    selector: (row: any) => row.address,
    sortable: true,
  },
  {
    name: "State",
    selector: (row: any) => row.state,
    sortable: true,
  },
  {
    name: "City",
    selector: (row: any) => row.city,
    sortable: true,
  },
  {
    name: "Country",
    selector: (row: any) => row.country,
    sortable: true,
  },
  {
    name: "Pincode",
    selector: (row: any) => row.pincode,
    sortable: true,
  },
];

const UserTable = () => {
  const userData = useSelector((state: RootState) => state.userData);

  useEffect(() => {
    setFilteredData(userData);
  }, [userData]);

  const [filteredData, setFilteredData] = useState(userData);

  const searchHandler = (e: any) => {
    const newData = userData.filter((item) => {
      return item.firstName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    setFilteredData(newData);
  };

  return (
    <Box
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        p: 4,
        width: "80%",
        m: "auto",
      }}
    >
      <Stack
        direction="row"
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={2}
        p={4}
      >
        <FormLabel>Search</FormLabel>
        <TextField
          type="search"
          color="success"
          placeholder="Search by name"
          onChange={searchHandler}
        />
      </Stack>
      <DataTable
        columns={columns}
        data={filteredData}
        // selectableRows
        fixedHeader
        pagination
      />
    </Box>
  );
};

export default UserTable;
