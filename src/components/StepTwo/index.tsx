import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { storeUserData } from "../../slice/userdataSlice";

const schema = yup.object({
  address: yup.string(),
  state: yup.string(),
  city: yup.string(),
  country: yup.string(),
  pincode: yup.string().matches(/^[0-9]*$/, "Only numbers are allowed"),
});

const StepTwo = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("india");
  const dispatch = useDispatch();

  const steponeData = useSelector(
    (state: RootState) => state.steponeData.steponeData
  );

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${searchCountry}`)
      .then((resp) => {
        const filteredData = resp.data.map((item: any) => {
          return {
            label: item.name.common,
            value: item.name.common,
          };
        });

        setCountries(filteredData);
      })
      .catch((err: any) => {
        console.log("err ====>", err);
      });
  }, [searchCountry]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    dispatch(
      storeUserData({
        ...steponeData,
        ...data,
      })
    );
  };

  return (
    <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", p: 4 }}>
      <Typography variant="h3">Additional Details</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"row"} gap={4} mt={2} mb={2} flexWrap={"wrap"}>
          <Stack>
            <TextField
              color="success"
              label="Address"
              type="text"
              {...register("address")}
            />
            <span style={{ color: "red" }}>{errors.address?.message}</span>
          </Stack>

          <Stack>
            <TextField
              color="success"
              label="State"
              type="text"
              {...register("state")}
            />
            <span style={{ color: "red" }}>{errors.state?.message}</span>
          </Stack>

          <Stack>
            <TextField
              color="success"
              label="City"
              type="text"
              {...register("city")}
            />
            <span style={{ color: "red" }}>{errors.city?.message}</span>
          </Stack>

          <Stack>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={countries}
              sx={{ width: "220px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  color="success"
                  {...register("country")}
                  onChange={(e) => {
                    setSearchCountry(e.target.value);
                  }}
                />
              )}
            />
            <span style={{ color: "red" }}>{errors.country?.message}</span>
          </Stack>

          <Stack>
            <TextField
              color="success"
              label="Pincode"
              type="text"
              {...register("pincode")}
            />
            <span style={{ color: "red" }}>{errors.pincode?.message}</span>
          </Stack>

          <br />
          <br />
        </Stack>

        {/* <TextField color="success" type="text" /> */}
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default StepTwo;
