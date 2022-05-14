import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/App.css";
import { Link, Outlet } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { authActions } from "./store/store";
import Dashboard from "./Components/Dashboard";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const dispatch = useDispatch();

  const sendRequest = async () => {
    const response = await axios.post("http://localhost:5000/logout", null, {
      withCredentials: true,
    });
    if (response.status === 200) return response;
    return new Error("Unable to Logout Sir!");
  };

  const handleLogout = () => {
    sendRequest().then(dispatch(authActions.logout()));
  };

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/">User-Authentication</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!isLoggedIn && (
                <>
                  {" "}
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </>
              )}
              {isLoggedIn && (
                <Nav.Link as={Link} onClick={handleLogout} to="/logout">
                  Logout
                </Nav.Link>
              )}
              <NavDropdown title="Show More" id="basic-nav-dropdown">
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item>Another action</NavDropdown.Item>
                <NavDropdown.Item>Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        {isLoggedIn && <Route path="dashboard" element={<Dashboard />} />}
      </Routes>
      <Outlet />
    </div>
  );
}

export default App;
