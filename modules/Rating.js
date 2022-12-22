import {useRef} from 'react'
import styles from './css/rating.module.css'
export default function Rating(props) {
    const ref = useRef();
    const handler = (e) => {
        let showValue = document.getElementById("rating-value")
        ref.current.querySelectorAll('input').forEach(item => {
            item = e.currentTarget.value
            console.log(item)
            showValue.innerHTML = item + "out of 5"
        });
        
        // for (let i = 0; i <star.length; i++){
        //     star[i].addEventListener('click', function(){
        //         i = this.value
        //         showValue.innerHTML = i + "out of 5" 
        //     });
        // }
    }
    
    
    return (
        <div className={styles.container}>
            <div className={styles.ratingModal}>
                <div className={styles.center}>
                    <div ref={ref} className={styles.rating}>
                        <input type="radio" id="star5" name="rating" value="5" handler={handler}/>
                        <label htmlfor="star5" className={styles.full}/>
                        <input type="radio" id="star4.5" name="rating" value="4.5" handler={handler}/>
                        <label htmlFor="star4.5" className={styles.half}></label>
                        <input type="radio" id="star4" name="rating" value="4" handler={handler}/>
                        <label htmlFor="star4" className={styles.full}></label>
                        <input type="radio" id="star3.5" name="rating" value="3.5" handler={handler}/>
                        <label htmlFor="star3.5" className={styles.half}></label>
                        <input type="radio" id="star3" name="rating" value="3" handler={handler}/>
                        <label htmlFor="star3" className={styles.full}></label>
                        <input type="radio" id="star2.5" name="rating" value="2.5" handler={handler}/>
                        <label htmlFor="star2.5" className={styles.half}></label>
                        <input type="radio" id="star2" name="rating" value="2" handler={handler}/>
                        <label htmlFor="star2" className={styles.full}></label>
                        <input type="radio" id="star1.5" name="rating" value="1.5" handler={handler}/>
                        <label htmlFor="star1.5" className={styles.half}></label>
                        <input type="radio" id="star1" name="rating" value="1" handler={handler}/>
                        <label htmlFor="star1" className={styles.full}></label>
                        <input type="radio" id="star0.5" name="rating" value="0.5" handler={handler}/>
                        <label htmlFor="star0.5" className={styles.half}></label>
                    </div>
                </div>
                <h4 id="rating-value" className='m-0 f-500 text-g' onClick={e => props.handler()}>Rate Event</h4>
            </div>
            
        </div>
    )
}
