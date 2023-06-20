import { useState } from "react";

function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (login.email && login.password) {
      console.log(login.email, login.password);
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
