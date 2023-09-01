import { Link } from "react-router-dom"
import Rating from "./rating"

export default function card(props) {

    const { product } = props

    return (
        <>
            <Link className={"link"} to={`/product/${product._id}`}>
                < div className="card  align-items-center card-size" >
                    <div>
                        <img src={product.image} className="card-img-top w-100 cloth-set" alt="error"></img>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                    </div>
                    <div className="align-items-center justify-content-around">
                        <Rating rating={product.rating} />
                        <span className="tetxt-dark">ratings {product.ratings}/10</span>
                    </div>
                    <div className="d-flex justify-content-between mt-2 ">
                        <h5 className="fw-bold " style={{ color: "black" }}>
                            ${product.price}
                        </h5>
                    </div>
                    <div className="card-body">
                        <div href="#" className="card-link">Cart link</div>
                        <div href="#" className="card-link">Another link</div>
                    </div>
                </div  >
            </Link>
        </>
    )
}
