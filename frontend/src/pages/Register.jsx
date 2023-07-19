import { useState } from "react";
import axios from "axios";

function Register() {
  const [register, setRegister] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = register;
    if (email && password) {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/users/register`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          console.log(data);
          alert("Successfully register");
        })
        .catch((err) => {
          console.log("err", err);
          if (err.response.status === 409) {
            alert("Duplicate email !");
          } else {
            alert("Error Sever");
          }
        });
    } else {
      alert("Please specify both email and password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          placeholder="test@blabla.com"
          value={register.email}
          onChange={(e) => setRegister({ ...register, email: e.target.value })}
        />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          id="password"
          placeholder="***********"
          value={register.password}
          onChange={(e) =>
            setRegister({ ...register, password: e.target.value })
          }
        />
      </label>
      <br />
      <input type="submit" value="Login" />
    </form>
  );
}

export default Register;
