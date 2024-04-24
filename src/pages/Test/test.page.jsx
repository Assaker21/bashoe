import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import "./test.page.scss";

export default function Test() {
  const [axiosParams, setAxiosParams] = useState("");
  const [response, setResponse] = useState("");

  async function request() {
    /*{
      method,
      url: url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        channel: "10192788",
        secret: "53a4546d02fb4c0386c93b328f3da175",
        websiteurl: "hoophouselb.onrender.com",
      },
    } */
    try {
      const res = await axios(JSON.parse(axiosParams));
      setResponse(JSON.stringify(res));
    } catch (err) {
      setResponse(Math.random() + "Frontend error: " + err.message);
      console.log("Frontend error: ", err);
    }
  }

  return (
    <section className="test-section">
      <TextField
        multiline
        rows={10}
        label="Axios input"
        style={{ width: "100%" }}
        value={axiosParams}
        onChange={(e) => {
          console.log("Target: ", e.target.value);
          console.log("JSON: ", JSON.parse(e.target.value));
          setAxiosParams(e.target.value.trim());
        }}
      />
      <TextField
        multiline
        label="Response"
        rows={10}
        style={{ width: "100%" }}
        value={response}
      />
      <Button
        variant="contained"
        onClick={() => {
          request();
        }}
      >
        Test
      </Button>
    </section>
  );
}