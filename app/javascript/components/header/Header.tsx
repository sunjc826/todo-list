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
import Toggle from "react-toggle";
import ConfirmationModal from "../shared/ConfirmationModal";
import { AppDispatch } from "../../redux/shared";

// import { ModalContext } from "../../customComponents";

interface AppProps {
  darkMode?: boolean;
  toggleDarkMode: () => void;
}

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
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
  const [statisticsTooltipOpen, setStatisticsTooltipOpen] = useState(false);
  const [activityTooltipOpen, setActivityTooltipOpen] = useState(false);
  const [usersTooltipOpen, setUsersTooltipOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState({
    task: false,
    activity: false,
    confirm: false,
  });
  const toggleModal = (type: "task" | "activity" | "confirm") => () =>
    setModalOpen({
      ...modalOpen,
      [type]: !modalOpen[type],
    });

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
    resetSidebar();
  };

  const handleLogout = () => {
    dispatch(logout());
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
      <ConfirmationModal
        action="Logout"
        message="Do you wish to logout?"
        handleConfirm={handleLogout}
        modalOpen={modalOpen["confirm"]}
        toggleModal={toggleModal("confirm")}
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
            <NavItem className="mx-3">
              <NavLink to="/statistics" className="nav-link">
                <i className="far fa-chart-bar fa-lg" id="statistics"></i>
              </NavLink>
              <Tooltip
                placement="right"
                target="statistics"
                isOpen={statisticsTooltipOpen}
                toggle={() => setStatisticsTooltipOpen(!statisticsTooltipOpen)}
              >
                Statistics
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
            <NavItem className="mx-3">
              <NavLink to="/users" className="nav-link">
                <i className="fas fa-users fa-lg" id="users"></i>
              </NavLink>
              <Tooltip
                placement="right"
                target="users"
                isOpen={usersTooltipOpen}
                toggle={() => setUsersTooltipOpen(!usersTooltipOpen)}
              >
                Other Users
              </Tooltip>
            </NavItem>
            <NavItem>
              <Button
                onClick={toggleModal("confirm")}
                className="btn-transition"
              >
                Logout <i className="fas fa-sign-out-alt"></i>
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
