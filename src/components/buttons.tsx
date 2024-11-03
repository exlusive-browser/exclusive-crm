import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const PrimaryButton = styled((props: ButtonProps) => (
  <Button color="primary" variant="contained" {...props}>
    {props?.children}
  </Button>
))(({ theme }) => ({
  fontWeight: "normal",
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1),
  fontSize: theme.typography.pxToRem(13),
}));

export const SecondaryButton = styled((props: ButtonProps) => (
  <Button color="secondary" variant="contained" {...props}>
    {props?.children}
  </Button>
))(({ theme }) => ({
  fontWeight: "normal",
  borderRadius: theme.spacing(1.75),
  p: 1.5,
}));

type ButtonPropsWithLink = ButtonProps & {
  navigateTo: string;
};

export const PrimaryLinkButton = styled((props: ButtonPropsWithLink) => {
  const { navigateTo, ...rest } = props;
  return (
    <Button
      color="primary"
      variant="contained"
      to={navigateTo}
      component={Link}
      {...rest}
    >
      {props?.children}
    </Button>
  );
})(({ theme }) => ({
  fontWeight: "normal",
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1),
  fontSize: theme.typography.pxToRem(13),
}));
