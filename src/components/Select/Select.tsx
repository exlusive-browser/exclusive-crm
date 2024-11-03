import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl, { FormControlProps } from "@mui/material/FormControl";
import BaseSelect, {
  SelectProps as BaseSelectProps,
} from "@mui/material/Select";
import KeyboardDownIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { styled } from "@mui/material/styles";
import { FormHelperText } from "@mui/material";

export type MenuItemPair = {
  text: string;
  value: number | string;
};

export type SelectProps<T> = BaseSelectProps<T> & {
  name: string;
  label: string;
  items: MenuItemPair[];
  helperText?: string;
};

function DropDownIcon() {
  return <KeyboardDownIcon color="secondary" />;
}

export const SelectFormControl = styled((props: FormControlProps) => (
  <FormControl size="small" fullWidth margin="dense" {...props} />
))<FormControlProps>(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: theme.spacing(2),
  },
  "& .MuiInputBase-input": {
    padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
  },
  "& .MuiInputLabel-root": {
    top: "3px",
  },
  "& .MuiSvgIcon-root": {
    marginRight: theme.spacing(2),
  },
}));

export function Select<T>({
  name,
  label,
  items,
  value: currentValue,
  onChange: handleChange,
  helperText,
  ...props
}: SelectProps<T>): JSX.Element {
  const inputId = `${name}-id`;
  const labelId = `${name}-label-id`;

  return (
    <SelectFormControl>
      <InputLabel id={labelId}>{label}</InputLabel>
      <BaseSelect
        labelId={labelId}
        id={inputId}
        value={currentValue}
        label={label}
        IconComponent={DropDownIcon}
        onChange={handleChange}
        {...props}
      >
        {items.map((itemData, index) => (
          <MenuItem key={index} value={itemData.value}>
            {itemData.text}
          </MenuItem>
        ))}
      </BaseSelect>
      {helperText && (
        <FormHelperText error={props.error}>{helperText}</FormHelperText>
      )}
    </SelectFormControl>
  );
}
