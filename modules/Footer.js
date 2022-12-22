import styles from "./css/footer.module.css";
import FooterMenuBar from "./Footer-Menu-Bar";
import BrandLogo from "./Logo";
import Facebook from "../icons/facebook";
import Twitter from "../icons/twitter";
import Linkedin from "../icons/linkedin";
import Link from 'next/link'
function TCFooter(props){
    return (
        <div className={` d-flex d-flex-wrap ${styles["footer"]}`}>
            <div className={`col-12 d-flex d-flex-wrap container  pt-5`}>
                <div className="col-12 col-md-4 pr-5 mt-3">
                    <Link href="/"><a><img src={'/images/logo.png'} alt="Brand Logo" className={styles["brand-image"]} /></a></Link>
                    <div className="font-12 l-18 f-400 col-12 col-md-7 text-grey mt-3">
                        Outside Awaits                    
                    </div>
                    <div className="d-flex d-align-center gap-1 mt-3">
                        <div className={`d-flex d-align-center d-justify-center ${styles["icon-border"]}`}>
                            <Twitter></Twitter>
                        </div>
                        <div className={`d-flex d-align-center d-justify-center ${styles["icon-border"]}`}>
                            <Facebook></Facebook>
                        </div>
                        <div className={`d-flex d-align-center d-justify-center ${styles["icon-border"]}`}>
                            <Linkedin></Linkedin>
                        </div>  
                    </div>
                    
                </div>
                <div className="col-12 col-md-8 mt-3">
                    <FooterMenuBar></FooterMenuBar>
                </div>
            </div>
            <div className={`col-12 ${styles["footer-bottom"]}`}>
                <div className={`d-flex container`}>
                    <span className="col-12 font-12 l-15 text-grey pt-3 pb-3 text-center f-400">
                        Copyright © 2022 Ticket Box
                    </span>
                </div>
            </div>
        </div>
    )
}
export default TCFooter;