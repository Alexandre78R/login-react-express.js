import { useState } from "react";
import axios from "axios";

function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = login;
    if (email && password) {
      // don't forget to import the axios module
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/users/login`,
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
          alert("Successfully logged in");
        })
        .catch((err) => {
          alert(err.response.data.error);
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
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
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
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
      </label>
      <br />
      <input type="submit" value="Login" />
    </form>
  );
}

export default Login;
