import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const SearchBar = () => {
  return (
    <Form inline>
      <FormGroup className="bg-light rounded">
        <Label for="search-bar" className="text-dark ml-2 mr-2">
          <i className="fas fa-search"></i>
        </Label>
        <Input
          type="text"
          id="search-bar"
          name="search-bar"
          placeholder="Find"
          className="border-0"
        />
      </FormGroup>
    </Form>
  );
};

export default SearchBar;
