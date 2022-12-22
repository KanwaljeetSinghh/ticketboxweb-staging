function FeaturedTabs(props){
    return (
        <div className={`d-flex d-flex-wrap gap-1 mb-2 d-align-center d-justify-center`}>
            {props.data.map((item,index)=>{
                return  <div key={index} className={`cursor-pointer home-featured-tab ${index==0 && "active"} bg-white border btn-rounded l-20 font-14 f-500 ${props.classes}`} keyword={item.keyword} onClick={props.handler}>
                    {item.name}
                </div>
            })}
        </div>
    );
}
export default FeaturedTabs;