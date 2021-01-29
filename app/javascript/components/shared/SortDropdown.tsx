import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { SortCategory } from "../../helperFunctions";

interface AppProps {
  dropdownOpen: boolean;
  toggleDropdown: () => void;
  sortBy: SortCategory;
  setSortBy: (sortBy: SortCategory) => void;
  sortAscending: boolean;
  setSortAscending: (sortAscending: boolean) => void;
}

const SortDropdown = ({
  dropdownOpen,
  toggleDropdown,
  sortBy,
  setSortBy,
  sortAscending,
  setSortAscending,
}: AppProps) => {
  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggleDropdown}
      style={{ display: "inline" }}
      className="mr-3"
    >
      <DropdownToggle caret>Sort</DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Sort by</DropdownItem>
        <DropdownItem
          onClick={() => setSortBy("none")}
          active={sortBy === "none"}
        >
          Reset
        </DropdownItem>
        <DropdownItem
          onClick={() => setSortBy("date")}
          active={sortBy === "date"}
        >
          Date
        </DropdownItem>
        <DropdownItem
          onClick={() => setSortBy("priority")}
          active={sortBy === "priority"}
        >
          Priority
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem header>Sort order</DropdownItem>
        <DropdownItem
          onClick={() => setSortAscending(true)}
          active={sortAscending}
        >
          Ascending
        </DropdownItem>
        <DropdownItem
          onClick={() => setSortAscending(false)}
          active={!sortAscending}
        >
          Descending
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SortDropdown;
