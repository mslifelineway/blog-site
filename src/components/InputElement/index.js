import {
  Box,
  FormHelperText,
  InputBase,
  TextareaAutosize,
} from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

const InputElement = (props) => {
  const {
    name,
    placeholder,
    type = "text",
    value,
    onChange,
    error,
    inputType,
  } = props;

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {inputType === "TextareaAutosize" ? (
        <TextareaAutosize
          minRows={5}
          aria-label={name}
          name={name}
          placeholder={placeholder}
          className={classes.textarea}
          onChange={onChange}
          autoComplete="off"
          value={value}
        />
      ) : (
        <InputBase
          className={classes.input}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
      )}
      <FormHelperText
        className={
          inputType === "TextareaAutosize" ? classes.error1 : classes.error
        }
      >
        {error}
      </FormHelperText>
    </Box>
  );
};

export default InputElement;
