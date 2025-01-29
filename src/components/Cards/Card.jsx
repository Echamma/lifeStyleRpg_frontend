import { IoCheckmarkDoneCircle } from "react-icons/io5";

const Card = ({Title, Desc, Exp, onDone}) =>{

    return(
        <article>
            <article>
                <h2>{Title}</h2>
                <p>{Desc}</p>
            </article>
            <p>{Exp} xp</p>
            <button onClick={onDone()}><IoCheckmarkDoneCircle />
            </button>

        </article>
    )
}
export default Card;