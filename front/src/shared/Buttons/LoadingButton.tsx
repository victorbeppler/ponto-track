import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface Props extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

export default function LoadingButton({
  children,
  loading,
  loadingText,
  fullWidth,
  sx,
  ...props
}: Props) {
  const textLoading = loadingText ?? children;
  const combinedSX = {
    display: "flex",
    backgroundColor: "#FFC03D",
    color: "black",
    "&:hover": { backgroundColor: "#FFC03D" },
    ...(sx || {}),
  };

  return (
    <Button
      fullWidth={fullWidth}
      disableElevation
      variant="contained"
      disabled={loading}
      sx={combinedSX} // Passe o objeto combinado
      {...props}
    >
      {loading && (
        <CircularProgress color="inherit" size={18} sx={{ marginRight: 1 }} />
      )}
      {loading ? textLoading : children}
    </Button>
  );
}
