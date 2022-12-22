import ModalAdjustWidth from "./Modal-adjust-width";
import Person from "../icons/notifications/person";
import Arrow from "../icons/arrow";
import Email from "../icons/notifications/email";
import FavoriteIcon from "../icons/notifications/favoriteIcon";
import Location from "../icons/notifications/location";
import Privacy from "../icons/notifications/privacy";
import ShareIcon from "../icons/notifications/shareIcon";
import Star from "../icons/notifications/star";
import Link from "next/link";

export default function ProfileNotifications(props){
    const hostPanelhandler = () => {
        window.open('https://host.ticketboxonline.com/',"_blank")
    }
    return (
        <div className={props.classes} id={props["modal-id"]}>
            <ModalAdjustWidth align="right" handler={props.handler}>
            
                <Link href="/user/edit-profile">
                    <a>
                        <div className="d-flex d-align-center d-justify-space-between" onClick={props.handler}>
                            <div className="d-flex d-align-center">
                                <Person></Person>
                                <span className="font-16 f-600 l-20 ml-1">Edit profile</span>                
                            </div>
                            <div className="transform-90">
                                <Arrow color="#808085"></Arrow>
                            </div>
                        </div>
                    </a>
                </Link>
                <div className="d-flex d-align-center d-justify-space-between mt-4 cursor-pointer" onClick={props.cities}>
                    <div className="d-flex d-align-center">
                        <Location></Location>
                        <span className="font-16 f-600 l-20 ml-1">Change Places</span>                
                        </div>
                        <div className="transform-90">
                        <Arrow color="#808085"></Arrow>
                    </div>
                </div>
                <div className="d-flex d-align-center d-justify-space-between mt-4  cursor-pointer" onClick={props.preferences}>
                    <div className="d-flex d-align-center">
                        <Star></Star>
                        <span className="font-16 f-600 l-20 ml-1">Change Interests</span>                
                        </div>
                        <div className="transform-90">
                        <Arrow color="#808085"></Arrow>
                    </div>
                </div>
                <Link href="/user/favorites">
                    <a>
                        <div className="d-flex d-align-center d-justify-space-between mt-4" onClick={props.handler}>
                            <div className="d-flex d-align-center">
                                <FavoriteIcon></FavoriteIcon>
                                <span className="font-16 f-600 l-20 ml-1">Favorites</span>                
                                </div>
                                <div className="transform-90">
                                <Arrow color="#808085"></Arrow>
                            </div>
                        </div>
                    </a>
                </Link>
                
                <div className="d-flex d-align-center d-justify-space-between mt-4 cursor-pointer cursor-pointer" onClick={props.referFriendHandler}>
                    <div className="d-flex d-align-center">
                        <ShareIcon></ShareIcon>
                        <span className="font-16 f-600 l-20 ml-1">Refer a Friend</span>                
                    </div>
                    <div className="transform-90">
                        <Arrow color="#808085"></Arrow>
                    </div>
                </div>
                <Link href="/policy">
                    <a>
                        <div className="d-flex d-align-center d-justify-space-between mt-4" onClick={props.handler}>
                            <div className="d-flex d-align-center">
                                <Privacy></Privacy>
                                <span className="font-16 f-600 l-20 ml-1">Privacy Policy</span>                
                                </div>
                                <div className="transform-90">
                                <Arrow color="#808085"></Arrow>
                            </div>
                        </div>
                    </a>
                </Link>
                <Link href="https://host.ticketboxonline.com/">
                    <a target="_blank" rel="noopener noreferrer" className="d-flex d-align-center d-justify-space-between mt-4"  onMouseUp={props.side}>
                        <div className="d-flex d-align-center cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 13C8.897 13 8 12.103 8 11C8 9.897 8.897 9 10 9C11.103 9 12 9.897 12 11C12 12.103 11.103 13 10 13ZM10 10.5C9.724 10.5 9.5 10.724 9.5 11C9.5 11.276 9.724 11.5 10 11.5C10.276 11.5 10.5 11.276 10.5 11C10.5 10.724 10.276 10.5 10 10.5Z" fill="#808085"/>
                                <path d="M19.3232 11.75H11.4268C11.0532 11.75 10.75 11.414 10.75 11C10.75 10.586 11.0532 10.25 11.4268 10.25H19.3232C19.6968 10.25 20 10.586 20 11C20 11.414 19.6968 11.75 19.3232 11.75Z" fill="#808085"/>
                                <path d="M8.62 11.75H4.63C4.28224 11.75 4 11.414 4 11C4 10.586 4.28224 10.25 4.63 10.25H8.62C8.96776 10.25 9.25 10.586 9.25 11C9.25 11.414 8.96776 11.75 8.62 11.75Z" fill="#808085"/>
                                <path d="M15 19C13.897 19 13 18.103 13 17C13 15.897 13.897 15 15 15C16.103 15 17 15.897 17 17C17 18.103 16.103 19 15 19ZM15 16.5C14.724 16.5 14.5 16.724 14.5 17C14.5 17.276 14.724 17.5 15 17.5C15.276 17.5 15.5 17.276 15.5 17C15.5 16.724 15.276 16.5 15 16.5Z" fill="#808085"/>
                                <path d="M19.3929 17.75H16.3571C16.022 17.75 15.75 17.414 15.75 17C15.75 16.586 16.022 16.25 16.3571 16.25H19.3929C19.728 16.25 20 16.586 20 17C20 17.414 19.728 17.75 19.3929 17.75Z" fill="#808085"/>
                                <path d="M13.5667 17.75H4.68333C4.30613 17.75 4 17.414 4 17C4 16.586 4.30613 16.25 4.68333 16.25H13.5667C13.9439 16.25 14.25 16.586 14.25 17C14.25 17.414 13.9439 17.75 13.5667 17.75Z" fill="#808085"/>
                                <path d="M19.7083 21.1663H4.29167C3.0275 21.1663 2 20.1388 2 18.8747V5.12467C2 3.86051 3.0275 2.83301 4.29167 2.83301H19.7083C20.9725 2.83301 22 3.86051 22 5.12467V18.8747C22 20.1388 20.9725 21.1663 19.7083 21.1663ZM4.29167 4.08301C3.7175 4.08301 3.25 4.55051 3.25 5.12467V18.8747C3.25 19.4488 3.7175 19.9163 4.29167 19.9163H19.7083C20.2825 19.9163 20.75 19.4488 20.75 18.8747V5.12467C20.75 4.55051 20.2825 4.08301 19.7083 4.08301H4.29167Z" fill="#808085"/>
                                <path d="M21.375 7.875H2.625C2.28 7.875 2 7.595 2 7.25C2 6.905 2.28 6.625 2.625 6.625H21.375C21.72 6.625 22 6.905 22 7.25C22 7.595 21.72 7.875 21.375 7.875Z" fill="#808085"/>
                            </svg>
                            <span className="font-16 f-600 l-20 ml-1">Host Dashboard </span>                
                        </div>
                        <div className="transform-90">
                            <Arrow color="#808085"></Arrow>
                        </div>
                    </a>
                </Link>
                <div className="d-flex d-align-center d-justify-space-between mt-3">
                    <span className="font-16 f-600 l-20 text-danger cursor-pointer modal-button" onClick={props.logoutHandler} onMouseUp={props.side}>Logout</span>                
                    <Link href="/user/deleteAccount"><a>
                        <span className="font-16 f-600 l-20 text-danger cursor-pointer" onMouseUp={props.side}>Delete Account</span>
                    </a></Link>
                </div>
            </ModalAdjustWidth>
        </div>
    );
}