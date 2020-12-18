import React, { useState } from "react";
import {
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse,
  Tooltip,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [barsTooltipOpen, setBarsTooltipOpen] = useState(false);
  const [homeTooltipOpen, setHomeTooltipOpen] = useState(false);
  const [plusTooltipOpen, setPlusTooltipOpen] = useState(false);
  const [questionTooltipOpen, setQuestionTooltipOpen] = useState(false);
  const [bellTooltipOpen, setBellTooltipOpen] = useState(false);

  return (
    <Navbar color="dark" dark expand="md">
      <Container fluid>
        <NavbarBrand href="/">
          <span>Todo App</span>
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/" className="nav-link">
                <i className="fas fa-bars fa-lg" id="bars"></i>
              </NavLink>
              <Tooltip
                placement="right"
                target="bars"
                isOpen={barsTooltipOpen}
                toggle={() => setBarsTooltipOpen(!barsTooltipOpen)}
              >
                Toggle sidebar
              </Tooltip>
            </NavItem>
            <NavItem>
              <NavLink to="/home" className="nav-link">
                <i className="fas fa-home fa-lg" id="home"></i>
              </NavLink>
              <Tooltip
                placement="right"
                target="home"
                isOpen={homeTooltipOpen}
                toggle={() => setHomeTooltipOpen(!homeTooltipOpen)}
              >
                Homepage
              </Tooltip>
            </NavItem>
            <NavItem>
              <SearchBar />
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem className="mx-3">
              <NavLink to="/" className="nav-link">
                <i className="far fa-plus-square fa-lg" id="plus"></i>
              </NavLink>

              <Tooltip
                placement="right"
                target="plus"
                isOpen={plusTooltipOpen}
                toggle={() => setPlusTooltipOpen(!plusTooltipOpen)}
              >
                Quick New Task
              </Tooltip>
            </NavItem>

            <NavItem className="mx-3">
              <NavLink to="/" className="nav-link">
                <i className="far fa-question-circle fa-lg" id="question"></i>
              </NavLink>
              <Tooltip
                placement="right"
                target="question"
                isOpen={questionTooltipOpen}
                toggle={() => setQuestionTooltipOpen(!questionTooltipOpen)}
              >
                Support
              </Tooltip>
            </NavItem>
            <NavItem className="mx-3">
              <NavLink to="/" className="nav-link">
                <i className="far fa-bell fa-lg" id="bell"></i>
              </NavLink>
              <Tooltip
                placement="right"
                target="bell"
                isOpen={bellTooltipOpen}
                toggle={() => setBellTooltipOpen(!bellTooltipOpen)}
              >
                Notifications
              </Tooltip>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
