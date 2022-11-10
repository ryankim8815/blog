import React from "react";
// import {
//   Button,
//   Container,
//   Form,
//   Nav,
//   Navbar,
//   NavDropdown,
//   Offcanvas,
// } from "react-bootstrap";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

function NavBarElements() {
  return (
    <>
      {/* {[false, "sm", "md", "lg", "xl", "xxl"].map((expand) => ( */}
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid className="justify-content-start">
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Brand></Navbar.Brand> {/* 공백용 */}
            <Navbar.Brand href="/">DogFoot</Navbar.Brand>
            {/* <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} /> */}
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              //   placement="end"
              placement="start" // 햄버거 버튼 위치 변경 방법을 찾아야함
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  사용자 닉네임 & 프로필 사진
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* <Nav.Link href="/">Home</Nav.Link> */}
                  <Nav.Link href="/about">About</Nav.Link>
                  <Nav.Link href="/projects">Projects</Nav.Link>
                  <Nav.Link href="/posts">Posts</Nav.Link>
                  <Nav.Link href="/live">Live</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/admin">Admin</Nav.Link>
                  <Nav.Link href="/editor">Editor</Nav.Link>
                  {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBarElements;
