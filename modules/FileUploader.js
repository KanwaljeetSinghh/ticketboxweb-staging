import React,{useState,useRef,useEffect} from 'react'
import styles from "./css/fileuploader.module.css";

export default function FileUploader(props) {
    const [file, setFile] = useState(null);
    const [isUploaded, setIsUploaded] = useState(props.uploaded);
    const [url,setUrl] = useState(props.fileAdded);
    const fileRef = useRef(null);
    const coverHandler = (e) => {
        setFile(e.target.files[0]);
    }
    useEffect(()=>{
        if(file){
            var formdata = new FormData();
            formdata.append("type", "user");
            formdata.append("file", file);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
            fetch(process.env.URL+"/upload-file/", requestOptions)
            .then(response => response.json())
            .then(result => {
                setIsUploaded(true)
                props.handler(result.url,file)
                setUrl(result.url,file)
            })
            .catch(error => {
                console.log('error', error)
            });
        }
    },[file])

    const backImage = {
        backgroundImage: isUploaded?`url("${url}")`:`url("/images/avatar.png")`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        borderColor:"transparent"
    }

    return (
        <div className={`${styles["upload"]} d-flex d-align-center cursor-pointer`} style={backImage}>
            {!isUploaded &&  <>
                    
                    <span className='ml-2 f-600 font-16 l-20 text-white'>
                        Edit Profile
                    </span>
                </>
            }
            {isUploaded &&  <>
                <h5 className={`f-600 font-14 l-20 mt-2 ${styles["upload-message"]}`}>Edit Profile Picture</h5>
            </>}
            <input 
                type='file'
                ref={fileRef}
                multiple={false}
                onChange={coverHandler}
                className={`${styles["uploader"]}`} 
            />
            
        </div>
    )
}
