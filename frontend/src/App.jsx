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
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#424242",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          whiteSpace: "nowrap",
          fontSize: 12.95,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "cursive",
          fontWeight: "bolder",
        },
      },
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
