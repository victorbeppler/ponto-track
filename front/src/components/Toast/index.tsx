import React from "react";
import { Alert, Box, Collapse, IconButton } from "@mui/material";
import { Clear } from "@mui/icons-material";

interface ToastProps {
  type: "error" | "warning" | "info" | "success";
  description?: string;
}

const Toast: React.FC<ToastProps> = ({ type, description }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      position="fixed"
      top={16}
      left={0}
      right={0}
      zIndex="tooltip"
    >
      <Collapse in={!!description}>
        <Alert
          severity={type}
          action={
            <IconButton color={type} size="small" onClick={() => {}}>
              <Clear fontSize="inherit" />
            </IconButton>
          }
        >
          <Box display="block">{description}</Box>
        </Alert>
      </Collapse>
    </Box>
  );
};

export default Toast;
