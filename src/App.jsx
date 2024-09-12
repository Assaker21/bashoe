import { useEffect, useState } from "react";
import Main from "./layouts/main/main.layout";
import Input from "./components/input/input.component";
import authenticationApi from "./api/authentication.api";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [value, setValue] = useState("");
  async function authenticate() {
    const { ok, data } = await authenticationApi.authenticate(null, {
      password: value,
    });
    if (ok) {
      setAuthenticated(true);
    }
  }

  useEffect(() => {
    authenticate();
  }, []);

  console.log("AUTHE: ", authenticated);

  if (!authenticated) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            gap: "8px",
          }}
        >
          <Input
            label="Passy passy?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            onClick={() => {
              authenticate();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  } else {
    return <Main />;
  }
}

export default App;
