import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";

const SearchBar = () => {
  const [touched, setTouched] = useState(false);
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (touched) {
      const parsed = queryString.parse(location.search);
      const newQuery = queryString.stringify({ ...parsed, searchTerm: query });
      history.push(`/tasks?${newQuery}`);
    }
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
          placeholder={focus ? "Taskname" : ""}
          className={`border-0 ${focus ? "active" : ""}`}
          value={query}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={handleChange}
        />
      </FormGroup>
    </Form>
  );
};

export default SearchBar;
