import { Box } from "@mui/material";
import StepContainer from "./components/StepContainer";
import UserTable from "./components/UserTable";

function App() {
  return (
    <Box sx={{ pb: 5 }}>
      <StepContainer />
      <UserTable />
    </Box>
  );
}

export default App;
