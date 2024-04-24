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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";
import whishServices from "../../services/whish-services";

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
    paymentMethod: "Cash on delivery",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.value);
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

  async function buttonClick() {
    const [ok, data] = await whishServices.getBalance(); /*{
      amount: 900,
      currency: "USD",
      invoice: "This is the invoice",
      externalId: 23,
      successCallbackUrl: "https://successCallbackUrl.com",
      failureCallbackUrl: "https://failedCallbackUrl.com",
      successRedirectUrl: "https://successRedirectUrl.com",
      failureRedirectUrl: "https://failureRedirectUrl.com",
    } */

    console.log("Received from whish to whish: ", data);
  }

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
            <Grid item xs={12}>
              <span className="item-list-title">Personal details</span>
            </Grid>
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
          <Grid container spacing={1.5} sx={{ pb: 1.5, mt: 1.5 }}>
            <Grid item xs={12}>
              <span className="item-list-title">Payment method</span>
            </Grid>
            <Grid item xs={12}>
              {/*<TextField
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
              </TextField>*/}
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="paymentMethod"
                className="checkout-payment-method-container"
                onChange={handleChange}
                value={info.paymentMethod}
              >
                <span className="checkout-payment-method-option">
                  <FormControlLabel
                    value="Cash on delivery"
                    control={<Radio />}
                    label={
                      <div className="checkout-payment-method-option-info">
                        <p>Cash on delivery</p>
                        <span>Pay once delivered to your doorstep.</span>
                      </div>
                    }
                  />
                </span>
                {/*<span className="checkout-payment-method-option">
                  <FormControlLabel
                    value="Whish money"
                    control={<Radio />}
                    label={
                      <div className="checkout-payment-method-option-info">
                        <p>
                          <img src="images/iconwhish.png" />
                          Whish money
                        </p>
                        <span>Pay via Whish Money and get free delivery.</span>
                      </div>
                    }
                  />
                  <span className="checkout-payment-method-option-badge">
                    FREE DELIVERY
                  </span>
                  </span>*/}
              </RadioGroup>
            </Grid>
          </Grid>

          <Grid container spacing={1.5} sx={{ pb: 1.5, mt: 1.5 }}>
            <Grid item xs={12}>
              <span className="item-list-title">Order summary</span>
            </Grid>
            <Grid item xs={12}>
              {cart && (
                <div className="checkout-order-summary">
                  {cart.map((item, index) => (
                    <div
                      className="checkout-order-summary-item"
                      key={"order summary item: " + index}
                    >
                      <img
                        className="checkout-order-summary-item-image"
                        src={item.item?.images[0].url.replace("<number>", "01")}
                      />
                      <span className="checkout-order-summary-item-name">
                        {item.item.name} - {item.variant.description}
                      </span>

                      <span className="checkout-order-summary-item-price">
                        ${item.item.price} x {item.quantity}
                      </span>
                    </div>
                  ))}

                  <div className="checkout-order-summary-item">
                    <span className="checkout-order-summary-item-name">
                      Shipping
                    </span>

                    <span className="checkout-order-summary-item-price">
                      {info.paymentMethod == "Whish money"
                        ? "FREE DELIVERY"
                        : "$4"}
                    </span>
                  </div>
                  <div className="checkout-order-summary-item">
                    <span className="checkout-order-summary-item-name">
                      Total
                    </span>
                    <span className="checkout-order-summary-item-price">
                      $
                      {calculateTotal() -
                        (info.paymentMethod == "Whish money" ? 4 : 0)}
                    </span>
                  </div>
                </div>
              )}
              {!cart && "No items in your cart"}
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          {!loading ? (
            <button
              disabled={getNumberOfItems() === 0}
              type="submit"
              className="checkout-button"
            >
              {info.paymentMethod == "Whish money"
                ? "Complete payment via Whish"
                : "Checkout"}
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
