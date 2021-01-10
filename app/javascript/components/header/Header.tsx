import React, { useState, useContext } from "react";
import {
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse,
  Tooltip,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions";
import QuickNewTask from "./QuickNewTask";
import { SidebarContext } from "../Index";
import ActivityModal from "./ActivityModal";

// import { ModalContext } from "../../customComponents";

const Header = () => {
  const dispatch = useDispatch();
  const { sidebarActive, setSidebarActive, resetSidebar } = useContext(
    SidebarContext
  )!;
  // const { toggleModal, setModalHeader, setModalContent } = useContext(
  //   ModalContext
  // );

  const [isOpen, setIsOpen] = useState(false);
  const [barsTooltipOpen, setBarsTooltipOpen] = useState(false);
  const [homeTooltipOpen, setHomeTooltipOpen] = useState(false);
  const [plusTooltipOpen, setPlusTooltipOpen] = useState(false);
  const [questionTooltipOpen, setQuestionTooltipOpen] = useState(false);
  const [activityTooltipOpen, setActivityTooltipOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState({ task: false, activity: false });
  const toggleModal = (type: "task" | "activity") => () =>
    setModalOpen({
      ...modalOpen,
      [type]: !modalOpen[type],
    });

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
    resetSidebar();
  };

  return (
    <Navbar color="dark" dark expand="md" fixed="top">
      <QuickNewTask
        modalOpen={modalOpen["task"]}
        toggleModal={toggleModal("task")}
      />
      <ActivityModal
        modalOpen={modalOpen["activity"]}
        toggleModal={toggleModal("activity")}
      />
      <Container fluid>
        <NavbarBrand href="/">
          <span>Todo App</span>
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="nav-link" onClick={toggleSidebar}>
              <i className="fas fa-bars fa-lg" id="bars"></i>
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
            <NavItem className="mx-3 nav-link" onClick={toggleModal("task")}>
              <i className="far fa-plus-square fa-lg" id="plus"></i>
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
              <NavLink to="/support" className="nav-link">
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
            <NavItem
              className="mx-3 nav-link"
              onClick={toggleModal("activity")}
            >
              <i className="fas fa-chart-line fa-lg" id="activity"></i>
              <Tooltip
                placement="right"
                target="activity"
                isOpen={activityTooltipOpen}
                toggle={() => setActivityTooltipOpen(!activityTooltipOpen)}
              >
                All Activities
              </Tooltip>
            </NavItem>
            <NavItem>
              <Button onClick={() => dispatch(logout())}>Logout</Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
