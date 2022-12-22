export default function Circle(props){
    return (
        <div className="bg-smoke-light  d-flex d-align-center p-1 d-justify-center circle" >
            {props.children}
        </div>
    );
}