import { Link, useNavigate, useParams } from "react-router-dom";
import apiHelper from "../comn/ApiHelper";
import { useEffect, useState } from "react";
import MessageBox from "../Components/MessageBox";
import Loader from "../Components/Loader";



export default function

    ProductScreen(props) {
    const { setcartItems, cartItems } = props
    const navigate = useNavigate();
    const { id } = useParams()
    const [isLoading, setisLoading] = useState(false)
    const [Product, setProdcuts] = useState({})
    const [err, seterr] = useState("")
    const [qty, setqty] = useState(1)


    const getProduct = async () => {
        try {

            setisLoading(true)
            const result = await apiHelper.fetchproductByid(id)
            setisLoading(false)
            // eslint-disable-next-line
            if (result.status === 200) {
                setProdcuts(result.data.product)
            }
        }
        catch (error) {
            setisLoading(false)
            if (error.response && error.response.data && error.response.data.message) {
                seterr(error.message)
            } else {
                seterr(error.message)
            }
        }

    }

    // eslint-disable-next-line
    useEffect(() => { getProduct() }, [id])


    const AddToCart = () => {

        try {
            const findIndex = cartItems.findIndex((x) => x.product === id)

            if (findIndex > -1) {
                cartItems[findIndex].qty = qty
            } else {
                cartItems.push({ product: id, qty: qty })
            }
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            setcartItems(cartItems)
            navigate("/Addtocart")

        } catch (error) {
            console.log(error.message)
        }

    }

    return (
        <div>

            {

                err && err.length > 0 ? (
                    <MessageBox message={err} />
                ) :
                    <>
                        <Loader loading={isLoading} />

                        <div className="container pro-link">
                            <div>
                                <Link className={""} to={`/`}><i className="fa-solid fa-arrow-left"></i>go to back</Link>
                            </div>

                            <div className="d-flex row" >


                                <div className=" col-6 align-items-center" >
                                    <div className="pro-card ">
                                        <img src={Product.image} className="card-img-top w-75 cloth-set " alt="error"></img>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="d-flex ">

                                        <div className="col-6">
                                            <div className="card-body pt-1">
                                                <h3 className="card-title">{Product.brand}</h3>
                                                <h6 className="card-title text-secondary">{Product.name}</h6>
                                            </div>
                                            <div className="justify-content-between d-flex text-align-left pt-1" style={{ width: "150px" }}>
                                                <div>{Product.rating}<i className="fa-solid fa-star"></i></div>
                                                <div><span>|</span></div>
                                                <div><span className="text-dark"> {Product.ratings}/10 ratings</span></div>
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            <div className="card-body pt-2">
                                                <h6>
                                                    Quantity
                                                </h6>
                                            </div>
                                            <div className="d-flex justify-content-between pt-1">
                                                <h6>Status</h6>
                                                <h6 className={Product.stocks > 0 ? "text-success" : "text-danger"}>{Product.stocks > 0 ? "in stock" : "out of stock"}</h6>
                                            </div>
                                        </div>

                                    </div>

                                    <hr style={{ color: "black" }} />

                                    <div className="d-flex text-align-left mt-2 " >
                                        <h5 className="fw-bold" style={{ color: "black" }}>
                                            ${Product.price}
                                        </h5>
                                        <div className="ps-3">
                                            MRP <span className="text-decoration-line-through">
                                                ${Product.discount}
                                            </span>
                                        </div>
                                        <div className="d-none d-md-block ps-3" >
                                            discount({Product.dis})
                                        </div>
                                    </div>
                                    <div className="" style={{ color: "blue" }}>
                                        <h6>
                                            inclusive of all taxes
                                        </h6>
                                    </div>
                                    {/* <div >
                            <h5>MORE COLORS</h5>
                            <div>

                            </div>
                        </div> */}

                                    <div className="purchase-info">
                                        <h3 style={{ color: "lightblue", marginTop: "5px", marginLeft: "-15px" }}>Quantity</h3>
                                        <div className='d-flex justify-content-center align-item-center ms-4'>

                                            <button onClick={() => setqty(qty - 1)} disabled={qty <= 0} className='btn fw-bold' style={{ background: "none", border: "none", color: "black", marginLeft: "-30px" }}>-</button>
                                            <span className='btn fw-bold' style={{ background: "none", border: "none", color: "black", marginTop: "3px", marginLeft: "-10px" }}>
                                                {qty}
                                            </span>
                                            <button onClick={() => setqty(qty + 1)} disabled={qty >= Product.stocks} className='btn fw-bond' style={{ background: "none", border: "none", color: "black", marginLeft: "-10px", marginTop: "2px" }}>+</button>
                                        </div>

                                        {/* <label for='Quantity'> Quantity:
                            <input type="number" id="Quantity" min={0} max={Product.countInstock} defaultValue={0} disabled={qty <= 0}/>
                        </label> */}
                                        <div className='cf'>
                                            <button type="button" className="btn" disabled={Product.stocks <= 0} onClick={AddToCart}>
                                                Add to Cart <i className="bi bi-cart" />
                                            </button>
                                        </div>

                                    </div>
                                </div >

                            </div>
                        </div >

                    </>
            }
        </div>
    )

}