import type { GroupBase, OptionProps, CSSObjectWithLabel } from "react-select";

export const generalFormElementStyle = {
  height: "2.5rem",
  weight: "100%",
  backgroundColor: "#F4F4F4",
  borderBottom: "1.25px solid #8D8D8D",
  boxShadow: "0px - 1px 0px 0px #8D8D8D inset",
  borderRadius: 0,
  color: "#161616",
  fontSize: "1rem",
  fontWeight: 400,
  padding: "0.5rem",
};

export const commonSelectStyles = {
  dropdownIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    bg: "transparent",
    px: 1,
    cursor: "inherit",
  }),
  indicatorSeparator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    display: "none",
  }),
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    border: "none",
    ...generalFormElementStyle,
    padding: 0,
    paddingLeft: "0.5rem",
  }),
};

export const asyncSelectStyles = {
  ...commonSelectStyles,
  option: (
    provided: CSSObjectWithLabel,
    state: OptionProps<unknown, false, GroupBase<unknown>>
  ) => ({
    ...provided,
    background: state.isFocused ? "#F4F4F4" : "#ffffff",
    color: "#525252",
  }),
  input: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "#A0A0A0",
    fontSize: "12px",
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    overflow: "visible",
    fontSize: "12px",
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    overflow: "visible",
    backgroundColor: "#F4F4F4",
  }),
  menuList: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: "100%",
    width: "100%",
    minWidth: "unset",
    fontSize: "12px",
  }),
  valueContainer: (provided: CSSObjectWithLabel) => ({
    ...provided,
    padding: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
  }),
  placeholder: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "#A8A8A8",
    fontSize: "12px",
  }),
};
