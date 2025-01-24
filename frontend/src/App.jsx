import AppRoutes from "./routes";
import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#c2185b",
      light: "#ec407a",
      dark: "#e91e63",
    },
  },
});
function App() {
  return (
    <>
      {/* ThemeProvider applies the custom theme globally to all MUI components within its child hierachy */}
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
