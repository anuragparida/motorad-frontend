

export default function PageLoader(props) {
  return (
    <>
       
    {props.loader ? 
      <div className="page_loader"></div>:""
    }


      {/* <Backdrop
        sx={{ background: "white",color:"#10b068" ,zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loader}
      >
        <CircularProgress color="inherit" />

      </Backdrop> */}
    </>
  );
}