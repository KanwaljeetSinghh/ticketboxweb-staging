import { useEffect } from "react";
import styles from "../modules/css/header.module.css";
import Link from "next/link";
export default function ErrorPage() {
  useEffect(()=>{
    document.getElementById("header").classList.add(styles["fixed-header"]);
  })

  return (
    
    <>
      <div className={`container  d-flex-wrap  text-center`}>
        <img src="/images/error-image.png" />
        <h2 className="l-40 f-700 mt-5">Page not found</h2>
        <Link href="/"><a><h4 className="l-23 f-700 text-grey mb-0 cursor-pointer">Back to Home</h4></a></Link>
      </div>
    </>
  )
}
