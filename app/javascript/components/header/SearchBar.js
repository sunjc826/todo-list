import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
// import { useQuery } from "../../customHooks";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const history = useHistory();
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    const newQuery = queryString.stringify({ ...parsed, searchTerm: query });
    history.push(`/tasks?${newQuery}`);
  }, [query]);

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
          placeholder="Find task by name"
          className="border-0"
          value={query}
          onChange={handleChange}
        />
      </FormGroup>
    </Form>
  );
};

export default SearchBar;
