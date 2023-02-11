import React, { useContext } from "react";
import { Context } from "../index";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Nav.Link
          href={SHOP_ROUTE}
          style={{
            color: "whitesmoke",
            textDecoration: "none",
            fontSize: 25,
            alignSelf: "baseline",
          }}
        >
          InCar
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {user.isAuth ? (
            <Nav>
              {user.user.role === "ADMIN" ? (
                <Button
                  variant="outline-light"
                  onClick={() => navigate(ADMIN_ROUTE)}
                  style={{ marginRight: 5, marginBottom: 5 }}
                >
                  Admin
                </Button>
              ) : (
                <Button
                  variant="outline-light"
                  onClick={() => navigate(BASKET_ROUTE)}
                  style={{ marginRight: 5, marginBottom: 5 }}
                >
                  Basket
                </Button>
              )}

              <Button
                key={user.user.id}
                variant="outline-danger"
                style={{ marginRight: 5, marginBottom: 5 }}
                onClick={() => {
                  user.setUser({});
                  user.setIsAuth(false);
                  localStorage.removeItem("token");
                }}
              >
                Log Out
              </Button>
            </Nav>
          ) : (
            <Nav>
              <Button
                variant="outline-success"
                style={{ marginRight: 5, marginBottom: 5 }}
                onClick={() => navigate(LOGIN_ROUTE)}
              >
                Log In
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;
