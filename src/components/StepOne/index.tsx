import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { storeStepOneData } from "../../slice/steponeSlice";

const phoneRegExp = /^(\+?91|0)?[6789]\d{9}$/;

const schema = yup.object({
  firstName: yup
    .string()
    .min(3, "Must be atleast 3 characters or more")
    .required("Required"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  gender: yup.string().required(),
  mobile: yup.string().matches(phoneRegExp, "Mobile number is not valid"),
  // .required("Required"),
  govtIssuedIdType: yup.string(),
  govtIssuedId: yup.string().test({
    name: "govtIssuedId",
    test: function (value: any) {
      const govtIssuedIdType = this.parent.govtIssuedIdType;
      if (govtIssuedIdType === "Aadhar") {
        return /^[2-9]\d{11}$/.test(value);
      } else if (govtIssuedIdType === "PAN") {
        return /^[A-Za-z0-9]{10}$/.test(value);
      }
      // If govtIssuedIdType is not Aadhar or PAN, no validation needed for govtIssuedId
      return true;
    },
    message: "Invalid Govt Issued ID",
  }),
  // .required("Govt Issued ID is required"),
});

interface StepOneProps {
  stepChangeHandler: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ stepChangeHandler }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    stepChangeHandler();
    dispatch(storeStepOneData(data));
  };

  return (
    <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", p: 4 }}>
      <Typography variant="h3">Personal Details</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"row"} gap={4} mt={2} mb={2} flexWrap={"wrap"}>
          <Stack>
            <TextField
              color="success"
              label="Name"
              type="text"
              {...register("firstName")}
            />
            <span style={{ color: "red" }}>{errors.firstName?.message}</span>
          </Stack>

          <Stack>
            <TextField
              color="success"
              label="Age"
              type="number"
              {...register("age")}
            />
            <span style={{ color: "red" }}>{errors.age?.message}</span>
          </Stack>

          <Stack>
            <TextField
              select
              label="Gender"
              color="success"
              sx={{ width: "220px" }}
              defaultValue={""}
              {...register("gender")}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </TextField>
            <span style={{ color: "red" }}>{errors.gender?.message}</span>
          </Stack>

          <Stack>
            <TextField color="success" label="Mobile" {...register("mobile")} />
            <span style={{ color: "red" }}>{errors.mobile?.message}</span>
          </Stack>

          <Stack>
            <TextField
              select
              label="Govt Issued Id Type"
              color="success"
              sx={{ width: "220px" }}
              defaultValue={""}
              {...register("govtIssuedIdType")}
            >
              <MenuItem value={"Aadhar"}>Aadhar</MenuItem>
              <MenuItem value={"PAN"}>PAN</MenuItem>
            </TextField>
            <span style={{ color: "red" }}>
              {errors.govtIssuedIdType?.message}
            </span>
          </Stack>

          <Stack>
            <TextField
              type="text"
              label="Govt Issued Id"
              color="success"
              {...register("govtIssuedId")}
            ></TextField>
            <span style={{ color: "red" }}>{errors.govtIssuedId?.message}</span>
          </Stack>
          <br />
          <br />
        </Stack>
        <Button type="submit" variant="contained" color="success">
          next
        </Button>
      </form>
    </Box>
  );
};

export default StepOne;
