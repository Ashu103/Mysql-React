import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function BasicAlerts({ msg }) {
  const [open, setopen] = useState(true);

  useEffect(() => {
    if (msg) {
      setopen(true);
    }
  }, [msg]);
  useEffect(() => {
    setTimeout(() => {
      setopen(false);
    }, 2000);
  }, [open]);
  return (
    <div>
      {open && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">{msg}</Alert>
        </Stack>
      )}
    </div>
  );
}
