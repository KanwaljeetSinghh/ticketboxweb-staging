export default function Cross(props){
    return (
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.75" y="0.75" width="19.5" height="19.5" rx="9.75" stroke={props.color} strokeOpacity="1" strokeWidth="1.5"/>
        <rect x="7" y="13.3318" width="8.95441" height="0.945091" rx="0.472545" transform="rotate(-45 7 13.3318)" fill={props.color}/>
        <rect width="8.95441" height="0.945091" rx="0.472545" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 14 13.3318)" fill={props.color}/>
        </svg>
    );
}