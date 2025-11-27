import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { CardMedia } from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { selectMessage, setMessage } from "../redux/reducer/commonResMessage";
interface State extends SnackbarOrigin {
  open: boolean;
}

export default function AlertMessages(props: any) {
  const message = useAppSelector(selectMessage);
  const dispatch = useDispatch();

  const [state, setState] = useState<State>({
    open: true,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setMessage({ status: false }));
    setState({ ...state, open: false });
  };

  const type = props.type ? props.type : "error";
  const classNameMssh = props.type == "error" ? "error-toast" : "snacbar-msg";
  const msg = props.msg ? props.msg : "Something went wrong.";
  return (
    <>
      {message && (
        <Stack>
          <Snackbar
            className="successMessage"
            open={open}
            anchorOrigin={{ vertical, horizontal }}
            onClose={handleClose}
            key={vertical + horizontal}
            autoHideDuration={3000}
          >
            <Alert
              iconMapping={{
                // success:
                //   // <CardMedia
                //   //   component={"img"}
                //   //   sx={{ marginLeft: "7px" }}
                //   //   image={"/green-circle-tick.svg"}
                //   //   alt="My Image"
                //   //   style={{ width: 20 }}
                //   // />
                // ,
                error: (
                  <CardMedia
                    component={"img"}
                    sx={{ marginLeft: "7px" }}
                    image={"/ic-missing.svg"}
                    alt="My Image"
                    style={{ width: 20 }}
                  />
                ),
              }}
              className={classNameMssh}
              onClose={handleClose}
              severity={type}
            >
              {/* <CardMedia component={"img"} sx={{ marginLeft: "7px" }} image={"/dollar-gold-icon.svg"} alt="My Image"
                        style={{ width: 20 }} /> */}
              {msg}
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </>
  );
}
