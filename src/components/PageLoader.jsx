import './pl.css'


export default function PageLoader(props) {
 
    return (
        <>
        <div style={{height:"100vh",width:"100%",position:"fixed",top:"0px",left:"0px",background:"white",display:"flex",justifyContent:"center",alignItems:"center",zIndex:11111111111,display:props.loading ? "none":""}}>
        <div class="bolt" >
                <svg viewBox="0 0 170 57" class="white left">
                    <path d="M36.2701759,17.9733192 C-0.981139498,45.4810755 -7.86361824,57.6618438 15.6227397,54.5156241 C50.8522766,49.7962945 201.109341,31.1461782 161.361488,2"></path>
                </svg>
                <svg viewBox="0 0 170 57" class="white right">
                    <path d="M36.2701759,17.9733192 C-0.981139498,45.4810755 -7.86361824,57.6618438 15.6227397,54.5156241 C50.8522766,49.7962945 201.109341,31.1461782 161.361488,2"></path>
                </svg>
                <div>
                    <span></span>
                </div>
                <svg viewBox="0 0 112 44" class="circle">
                    <path d="M96.9355003,2 C109.46067,13.4022454 131.614152,42 56.9906735,42 C-17.6328048,42 1.51790702,13.5493875 13.0513641,2"></path>
                </svg>
                <svg viewBox="0 0 70 3" class="line left">
                    <path transform="translate(-2.000000, 0.000000)" d="M2,1.5 L70,1.5"></path>
                </svg>
                <svg viewBox="0 0 70 3" class="line right">
                    <path transform="translate(-2.000000, 0.000000)" d="M2,1.5 L70,1.5"></path>
                </svg>
            </div>
            <small>LOADING...<br /></small>
        </div>
            

        </>
    );
}