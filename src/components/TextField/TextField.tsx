import { styled } from "@mui/material/styles";
import BaseTextField, {
  TextFieldProps as BaseTextFieldProps,
} from "@mui/material/TextField";

export type TextFieldProps = BaseTextFieldProps & {
  name: string;
};

export const TextField = styled((props: TextFieldProps) => (
  <BaseTextField
    fullWidth
    size="small"
    margin="normal"
    id={`${props.name}-id`}
    {...props}
  />
))<TextFieldProps>(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: theme.spacing(2),
  },
  "& .MuiInputBase-input": {
    padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
    py: 1.5,
  },
  "& .MuiInputLabel-root": {
    top: "3px",
  },
}));
