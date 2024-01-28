import { Box } from "@mui/material";
import React, { useState } from "react";
import StepOne from "../StepOne";
import StepTwo from "../StepTwo";

const StepContainer = () => {
  const [step, setStep] = useState(1);

  const stepChangeHandler = () => {
    setStep(2);
  };

  return (
    <Box
      sx={{
        width: "80%",
        m: "50px auto",
      }}
    >
      {step === 1 && <StepOne stepChangeHandler={stepChangeHandler} />}

      {step === 2 && <StepTwo />}
    </Box>
  );
};

export default StepContainer;
