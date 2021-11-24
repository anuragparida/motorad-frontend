import { Backdrop, CircularProgress } from '@material-ui/core';
import LinearProgress from '@mui/material/LinearProgress';


export default function PageLoader(props) {
  return (
    <>
      {props.loader ? <LinearProgress color="success" style={{ zIndex: "99999999" }} />
        :
        ""}


      <Backdrop
        sx={{ background: "", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loader}
      >
        {/* <CircularProgress color="inherit" /> */}

      </Backdrop>
    </>
  );
}