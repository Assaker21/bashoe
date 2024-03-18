import Slider from "../../basic-components/slider/slider.component";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component";
import { useGeneralContext } from "../../contexts/context";
import { useNavigate } from "react-router-dom";
import "./checkout.page.scss";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import ordersService from "../../services/orders-service";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f0f0f",
    },
  },
});

export default function Checkout() {
  const { calculateTotal, getNumberOfItems, cart, setCart } =
    useGeneralContext();
  const [info, setInfo] = useState({
    region: "Lebanon",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const [ok, data] = await ordersService.createOrder({ info, cart });
    if (ok) {
      console.log("Response: ", data);
      setCart([]);
      navigate("/finish");
    } else {
      console.log("ERROR: ", data);
    }
    setLoading(false);
  };

  return (
    <section className="checkout">
      <Breadcrumbs
        items={[
          { name: "Home", to: "/" },
          { name: "Checkout", to: `/checkout` },
        ]}
      />
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1.5} sx={{ pb: 1.5 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First name"
                color="primary"
                name="firstName"
                variant="filled"
                size="small"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last name"
                color="primary"
                variant="filled"
                name="lastName"
                size="small"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                onChange={handleChange}
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
                name="email"
                size="small"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone number"
                color="primary"
                variant="filled"
                name="phoneNumber"
                size="small"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                onChange={handleChange}
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
                name="region"
                size="small"
                value="Lebanon"
                defaultValue="Lebanon"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                label="City"
                color="primary"
                name="city"
                variant="filled"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                color="primary"
                variant="filled"
                name="address"
                size="small"
                sx={{ backgroundColor: "var(--lighter-background-color)" }}
                onChange={handleChange}
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
                onChange={handleChange}
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
          {loading ? (
            <button
              disabled={getNumberOfItems() === 0}
              type="submit"
              className="checkout-button"
            >
              Checkout - {getNumberOfItems()} item
              {getNumberOfItems() === 1 ? "" : "s"} - ${calculateTotal()}
            </button>
          ) : (
            <button disabled={true} type="button" className="checkout-button">
              Checking out...
            </button>
          )}
        </form>
      </ThemeProvider>
    </section>
  );
}
