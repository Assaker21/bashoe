import Slider from "../../basic-components/slider/slider.component";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component";
import "./checkout.page.scss";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f0f0f",
    },
  },
});

export default function Checkout() {
  return (
    <section className="checkout">
      <Breadcrumbs
        items={[
          { name: "Home", to: "/" },
          { name: "Checkout", to: `/checkout` },
        ]}
      />
      <ThemeProvider theme={theme}>
        <form>
          <Grid container spacing={1.5} sx={{ pb: 1.5 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First name"
                color="primary"
                variant="filled"
                size="small"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last name"
                color="primary"
                variant="filled"
                size="small"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                color="primary"
                variant="filled"
                size="small"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone number"
                color="primary"
                variant="filled"
                size="small"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={1.5} sx={{ pb: 1.5 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Country/Region"
                color="primary"
                variant="filled"
                size="small"
                value="Lebanon"
                defaultValue="Lebanon"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                label="City"
                color="primary"
                variant="filled"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                color="primary"
                variant="filled"
                size="small"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={1.5} sx={{ pb: 1.5 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Payment method"
                defaultValue="Cash on delivery"
                variant="filled"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                size="small"
                required
              >
                {["Cash on delivery"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <button type="submit" className="checkout-button">
            Checkout - 5 items - $700
          </button>
        </form>
      </ThemeProvider>
    </section>
  );
}
