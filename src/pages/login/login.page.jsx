import { useState } from "react";
import "./login.page.scss";
import authenticationServices from "../../services/authenticationServices";
import { useGeneralContext } from "../../contexts/context";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { updateAuthentication } = useGeneralContext();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const [ok, data] = await authenticationServices.authenticate(formData);
    if (ok) {
      updateAuthentication(true);
      navigate("/");
    } else {
      setFormData({ username: "", password: "" });
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        className="login-input"
        type="text"
        name="username"
        id="username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        className="login-input"
        type="password"
        name="password"
        id="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button className="login-button" type="submit">
        Submit
      </button>
    </form>
  );
}
