function SectionHeading(props){
    return (
        <div className={`col-12 d-flex d-align-center d-justify-center d-flex-wrap tc-section-heading ${props.classes}`}>
            <span className="col-12 f-700 font-12 l-15 text-gradient text-center">
                {props.tag}
            </span>
            <h2 className="col-12 text-secondary l-40 text-center">
                {props.title}
            </h2>
        </div>
    )
}
export default SectionHeading;