import { Backdrop, CircularProgress } from '@material-ui/core';


export default function PageLoader(props) {
    return (
        <>
        <Backdrop
        sx={{ background: "white", color: '#10b068', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        </>
    );
  }