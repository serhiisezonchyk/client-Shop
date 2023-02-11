import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Container, Form, Card, FormControl, Button } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../index";
import { registration, login } from "../http/userApi";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
const Auth = observer(() => {
  const { user } = useContext(Context);

  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);

      navigate(SHOP_ROUTE);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ height: window.innerHeight - 59 }}
    >
      <Card
        style={{ width: window.innerWidth - window.innerWidth / 4 }}
        className="p-5 shadow p-3 mb-5 bg-body rounded"
      >
        <h2 className="m-auto">{isLogin ? "Authorization" : "Registration"}</h2>
        <Form className="d-flex flex-column">
          <FormControl
            placeholder="Email..."
            className="mt-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl
            type="password"
            placeholder="Password..."
            className="mt-3 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="mt-3" variant="outline-dark" onClick={click}>
            {isLogin ? "Log In" : "Register"}
          </Button>
          {isLogin ? (
            <NavLink
              className="pt-3 "
              style={{ textDecoration: "none" }}
              to={REGISTRATION_ROUTE}
            >
              Don't have an account? Sign Up here.
            </NavLink>
          ) : (
            <NavLink
              className="pt-3 "
              style={{ textDecoration: "none" }}
              to={LOGIN_ROUTE}
            >
              Already have an account? Login here.
            </NavLink>
          )}
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
