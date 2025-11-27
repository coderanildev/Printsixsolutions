import { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useErrorBoundary, withErrorBoundary } from "react-use-error-boundary";
import { setLoader } from "../redux/reducer/loader";

import Loader from "../common/Loader";
import AlertMessages from "../common/alertMessage";
import Header from "../common/Header";
import Footer from "../common/Footer";

interface LoaderState {
  loader: boolean;
  progress: boolean;
}

interface MessageState {
  message: {
    status: string;
    type: string;
    message: string;
  };
  snackBar: any[];
}

interface RootState {
  loader: LoaderState;
  message: MessageState;
}

const Layout = withErrorBoundary(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoader(true)); // Set loading to true when component mounts

    return () => {
      dispatch(setLoader(false)); // Reset loading when component unmounts
    };
  }, [dispatch]);

  // const router = useLocation();

  // const { loading, msg } = useSelector((state: RootState) => ({
  //   loading: state.loader.loader,
  //   msg: state.message,
  // }));

  // const [error, resetError] = useErrorBoundary();

  // if (error && typeof error?.message !== "undefined") {
  //   return (
  //     <div style={{ padding: 10, width: "100%", margin: "auto" }}>
  //       <p>{error?.message}</p>
  //       <button onClick={resetError}>Try again</button>
  //     </div>
  //   );
  // }

  return (
    <>
      {/* {loading && <Loader />}       */}
      {/* {msg?.status && (
        <AlertMessages type={msg?.type} msg={msg?.message} />
      )} */}

      <div>
        <Header />
        <main  style={{ backgroundColor: "#020817" }}>
          <Outlet />
        </main>
        <Footer/>
      </div>
    </>
  );
});

export default Layout;
