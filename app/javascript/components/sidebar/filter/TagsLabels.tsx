import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Label, FormGroup, Input } from "reactstrap";
import { RootState } from "../../../redux/rootReducer";

interface FormState {
  tag: Record<string, boolean>;
  label: Record<string, boolean>;
}

interface FilterFormState extends FormState {
  filter: {
    description: string;
    startdate: string;
    enddate: string;
  };
}

interface QuickTaskFormState extends FormState {
  content: string;
  priority: number;
  deadline: string;
  completed: boolean;
}
// TODO: Not sure how to get rid of type errors in NewFilter and QuickNewTask

interface AppProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  defaultFormState: FormState;
}

const TagsLabels = ({
  formState,
  setFormState,
  defaultFormState,
}: AppProps) => {
  const handleCheckChange = (type: "tag" | "label") => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newState = {
      ...formState,
      [type]: {
        ...formState[type],
        [e.target.name]: !formState[type][e.target.name],
      },
    };
    setFormState(newState);
  };
  // Prevents the parent element ListGroup from capturing the event
  // and toggling the Collapse component
  const stopProp = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const tagState = useSelector((state: RootState) => state.tag);
  const tagLoading = tagState.loading;
  const tagErrMsg = tagState.errMsg;
  const tagData = tagState.data;
  const labelState = useSelector((state: RootState) => state.label);
  const labelLoading = labelState.loading;
  const labelErrMsg = labelState.errMsg;
  const labelData = labelState.data;
  let tagsComponent = [];
  let labelsComponent = [];
  const [effectUsed, setEffectUsed] = useState(false);
  useEffect(() => {
    if (tagLoading) {
    } else if (tagErrMsg) {
    } else {
      for (const key in tagData) {
        defaultFormState.tag[key] = false;
      }
      for (const key in labelData) {
        defaultFormState.label[key] = false;
      }
      setFormState(defaultFormState);
    }
    setEffectUsed(true);
    // considering that setState methods are async, does everything in a useEffect
    // always finish execution before the next render?
  }, [labelState]);

  // runs on second render and beyond
  // TODO: Use callbacks to achieve this instead of the effectUsed hack?
  if (effectUsed) {
    // alternative way
    // const tempFormState = formState ? formState : defaultFormState;

    for (const key in tagData) {
      const ele = tagData[key];
      tagsComponent.push(
        <FormGroup check key={key}>
          <Label check>
            <Input
              type="checkbox"
              name={key}
              checked={formState.tag[key]}
              onChange={handleCheckChange("tag")}
              onClick={stopProp}
            />{" "}
            {ele.attributes.description}
          </Label>
        </FormGroup>
      );
    }
    for (const key in labelData) {
      const ele = labelData[key];
      labelsComponent.push(
        <FormGroup check key={key}>
          <Label check>
            <Input
              type="checkbox"
              name={key}
              checked={formState.label[key]}
              onChange={handleCheckChange("label")}
              onClick={stopProp}
            />{" "}
            {ele.attributes.description}
          </Label>
        </FormGroup>
      );
    }
  }

  return (
    <Fragment>
      <FormGroup
        tag="fieldset"
        className="border border-dark rounded px-2 pb-1"
      >
        <legend className="mb-0">Tags</legend>
        {tagsComponent}
      </FormGroup>
      <FormGroup
        tag="fieldset"
        className="border border-dark rounded px-2 pb-1"
      >
        <legend className="mb-0">Labels</legend>
        {labelsComponent}
      </FormGroup>
    </Fragment>
  );
};

export default TagsLabels;
