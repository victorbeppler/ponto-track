import { ReactNode } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { TextField } from "@mui/material";

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  placeholder?: string;
  multiline?: boolean;
  fullWidth?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  size?: "medium" | "small";
  mask?: string | Array<{ mask: string }>;
  minRows?: number;
  maxRows?: number;
  label: string;
  maxLength?: number;
  type?: string;
}

export default function ControlledText<T extends FieldValues>({
  placeholder = "Digite aqui...",
  fullWidth = true,
  size = "small",
  multiline,
  disabled,
  readOnly,
  label,
  icon,
  minRows,
  maxRows,
  maxLength,
  type,
  ...props
}: Props<T>) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <TextField
      {...field}
      type={type}
      minRows={minRows ?? 4}
      maxRows={maxRows}
      size={size}
      label={label}
      error={!!error}
      disabled={disabled}
      fullWidth={fullWidth}
      multiline={multiline}
      placeholder={placeholder}
      helperText={error?.message}
      InputProps={{
        readOnly: readOnly,
        endAdornment: icon,
        inputProps: {
          maxLength: maxLength,
        },
      }}
    />
  );
}
