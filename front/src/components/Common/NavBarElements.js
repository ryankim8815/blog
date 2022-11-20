import React from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

function NavBarElements() {
  return (
    <>
      {/* {[false, "sm", "md", "lg", "xl", "xxl"].map((expand) => ( */}
      {["sm"].map((expand) => (
        // {[false].map((expand) => (
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
                  {/* <Nav.Link href="/projects">Projects</Nav.Link> */}
                  {/* <Nav.Link href="/posts">Posts</Nav.Link> */}
                  {/* <Nav.Link href="/live">Live</Nav.Link> */}
                  <Nav.Link href="/editor">Editor</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                  {/* <Nav.Link href="/admin">Admin</Nav.Link> */}
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBarElements;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "./Button";
// import "./NavBarElements.css";
// import * as FA from "react-icons/fa";
// import * as FI from "react-icons/fi";

// function NavBarElements() {
//   const [click, setClick] = useState(false);
//   const [button, setButton] = useState(true);

//   const handleClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false);

//   // 화면 크기에 따라서 버튼이 보이고 안보이도록 설정한다.
//   const showButton = () => {
//     if (window.innerWidth <= 960) {
//       setButton(false);
//     } else {
//       setButton(true);
//     }
//   };

//   // SIGNUP버튼이 사이즈가 줄어들면 없어지도록 한다.
//   useEffect(() => {
//     showButton();
//   }, []);

//   window.addEventListener("resize", showButton);

//   return (
//     <>
//       <nav className="navbar">
//         <div className="navbar-container">
//           <FI.FiMenu size="2.5rem" />

//           {/* 모바일버전에서 클릭하면 메뉴 보이도록 설정하는 것도 한다. (close Mobile Menu)는 다시 버튼 누르면 없어지고 생기고 하도록 한다.  */}
//           <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
//             DogFoot
//             <i className="fab fa-typo3" />
//           </Link>
//           <div className="menu-icon" onClick={handleClick}>
//             <i className={click ? "fas fa-times" : "fas fa-bars"} />
//           </div>
//           <ul className={click ? "nav-menu active" : "nav-menu"}>
//             <li className="nav-item">
//               <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
//                 About
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link
//                 to="/projects"
//                 className="nav-links"
//                 onClick={closeMobileMenu}
//               >
//                 Projects
//               </Link>
//             </li>
//             {/* <li className="nav-item">
//               <Link to="/admin" className="nav-links" onClick={closeMobileMenu}>
//                 Admin
//               </Link>
//             </li> */}
//             <li className="nav-item">
//               <Link
//                 to="/editor"
//                 className="nav-links"
//                 onClick={closeMobileMenu}
//               >
//                 Editor
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
//                 login
//               </Link>
//             </li>
//             {/* <li className="nav-item">
//               <Link
//                 to="/sign-up"
//                 className="nav-links-mobile"
//                 onClick={closeMobileMenu}
//               >
//                 Sign Up
//               </Link>
//             </li> */}
//           </ul>
//           {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
//           {/* <Button buttonStyle="btn--outline">SIGN UP</Button> */}
//         </div>
//       </nav>
//     </>
//   );
// }

// export default NavBarElements;
