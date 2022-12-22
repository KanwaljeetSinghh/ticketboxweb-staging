import styles from "./css/header.module.css";
function BrandLogo(props){
    return (
        <img src={'/images/white-logo.png'} alt="Brand Logo" className={styles["brand-image"]} />
    )
}
export default BrandLogo;