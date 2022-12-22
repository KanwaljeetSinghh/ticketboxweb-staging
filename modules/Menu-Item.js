function MenuItem(props){
    return (
        <a className={`cursor-pointer font-13 l-16 text-white ${props.classes}`} href={props.href} onClick={props.handler}>{props.value}</a>
    )
}

export default MenuItem;