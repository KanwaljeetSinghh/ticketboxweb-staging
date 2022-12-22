import styles from "./css/footer.module.css";
import Link from "next/link";
function FooterMenuBar(props){
    return(
        <div className='d-flex d-flex-wrap col-12'>
            <ul className={`col-6 col-sm-4 list-style-none `}>
                <li>
                    <h6 className='mb-0 f-700'>Company</h6>
                    <ul className={`list-style-none p-0 ${styles["menu-list"]}`}>
                        <li className='mt-2 f-400 font-13 '><span className="text-grey" href="">About</span></li>
                        <Link href="/terms">
                            <a><li className='mt-2 f-400 font-13 '><span className="text-grey" href="">Terms of Use</span></li></a>
                        </Link>
                        <Link href="/policy">
                            <a><li className='mt-2 f-400 font-13 '><span className="text-grey" href="">Privacy Policy</span></li></a>
                        </Link>
                        <li className='mt-2 f-400 font-13 '><span className="text-grey" href="">How It Works</span></li>
                  </ul>
                </li>
            </ul>

            {/* <ul className={`col-6 col-sm-4 list-style-none `}>
                <li>
                    <h6 className='mb-0 f-700'>Support</h6>
                    <ul className={`list-style-none p-0 ${styles["menu-list"]}`}>
                        <li className='mt-2 f-400 font-13 '><a className="text-grey" href="">Support Career</a></li>
                        <li className='mt-2 f-400 font-13'><a className="text-grey" href="">Quick Chat</a></li>
                    </ul>
                </li>
            </ul> */}

            <ul className={`col-12 col-sm-4 col-md-4 list-style-none ${styles["menu-list"]}`}>
                <li>
                    <h6 className='mb-0 f-700'>Contact</h6>
                    <ul className={`list-style-none p-0`}>
                        <li className='mt-2 f-400 font-13'><span className="text-grey" href="mailto:admin@ticketboxonline.com">admin@ticketboxonline.com</span></li>
                        <li className='mt-2 f-400 font-13'><span className="text-grey" href="tel:1-868-342-7648">1-868-342-7648</span></li>
                    </ul>
                    
                </li>
            </ul>

            

        </div>
    )
}

export default FooterMenuBar;