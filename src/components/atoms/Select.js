// React
import React from "react";

// MUI
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SelectSearch = props => {
  const {
    list,
    disabled,
    value,
    onChange,
    label,
    variant,
    noOptionsText,
    optionalLabel
  } = props;
  return (
    <Autocomplete
      value={value}
      filterSelectedOptions
      onChange={onChange}
      options={list}
      getOptionLabel={optionalLabel}
      renderTags={tagValue =>
        tagValue.map(option => (
          <Chip label={option?.question} key={option?.id} />
        ))
      }
      renderInput={params => (
        <TextField
          {...params}
          fullWidth
          margin="dense"
          size="small"
          label={label}
          variant={variant}
        />
      )}
      noOptionsText={noOptionsText}
      disabled={disabled}
    />
  );
};

SelectSearch.defaultProps = {
  list: [],
  label: "Label",
  value: null,
  onChange: () => {},
  disabled: false,
  variant: "standard",
  noOptionsText: "Nema pronađenih opcija",
  optionalLabel: () => {}
};

export default SelectSearch;
