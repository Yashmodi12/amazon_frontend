import { useEffect, useState } from "react"
import "../screens/Cartscreen.css"
import apiHelper from "../comn/ApiHelper"
import { Link, useNavigate } from "react-router-dom"
import MessageBox from "../Components/MessageBox"
import Loader from "../Components/Loader"

export default function Cartscreen(props) {
    const navigate = useNavigate()
    let { cartItems, setcartItems } = props
    const [err, seterr] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const [cart, setcart] = useState([])
    const [summarydetails, setsummarydetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        totalProducts: 0,
        delivery: 0,
        text: 0
    })

    const getcart = async () => {

        try {

            setisLoading(true)
            const product = cartItems.map((x) => x.product)
            const result = await apiHelper.fetchcart(product)


            const products = result?.data?.cart?.filter((x) => {

                return x.stocks > 0
            })

            for (let i in products) {
                for (let j in cartItems) {
                    if (cartItems[j].product === products[i]._id) {
                        products[i].qty = cartItems[j].qty
                    }
                }

            }
            setcart(products)

            setisLoading(false)

        }
        catch (error) {

            setisLoading(false)
            if (error.response && error.response.data && error.response.data.message) {
                seterr(error.message)
            }
            seterr(error.message)
            return
        }
    }

    // eslint-disable-next-line 
    useEffect(() => { getcart() }, [cartItems])

    useEffect(() => {
        let i = 0
        let totalPrice = 0
        let totalitems = 0
        let totalProducts = 0

        while (i < cart.length) {
            if (cart[i].stocks > 0) {
                totalitems += cart[i].qty
                totalPrice += (cart[i].qty * cart[i].price)
                totalProducts++
            }
            i++
        }
        setsummarydetails({
            ...summarydetails, totalitems: totalitems, totalAmount: totalPrice, totalProducts: totalProducts
        })
        // eslint-disable-next-line 
    }, [cart])

    const RemoveHandler = (id) => {
        cartItems = cartItems.filter((x) => x.product !== id)
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        setcartItems(cartItems)
        getcart()
    }


    const ProceesToCheckout = () => {
        const token = localStorage.getItem("token")

        if (!token) {
            navigate("/Login?redirect=Shipping")
        }
        else {
            navigate("/Shipping?redirect=Placeorder")
        }
    }

    return (

        <>
            {
                err ? <>
                    <MessageBox>{err}</MessageBox>
                </> : (

                    <div className="wrap cf">
                        <Loader isLoading={isLoading} />
                        <div className="heading cf">
                            <h1>My Cart</h1>
                            <Link to={'/product'} className="continue">
                                Continue Shopping
                            </Link>
                        </div>
                        <div className="cart">
                            <ul className="cartWrap">
                                {
                                    cart.length <= 0 ? (
                                        <h5 className='text-danger-center'>cart is empty</h5>
                                    ) : (
                                        cart && cart.map((x, index) => {

                                            return (
                                                <li className="items odd">
                                                    <div className="infoWrap">
                                                        <div className="cartSection">
                                                            <img
                                                                src={x.image}
                                                                alt=""
                                                                className="itemImg"
                                                            />
                                                            <p className="itemNumber">{x._id}</p>
                                                            <h3 className='carttitle'>{x.name}</h3>
                                                            <p>
                                                                <div className="d-flex align-items-center mb-4" style={{ maxWidth: "300px" }}>
                                                                    <span>Quantity :</span>
                                                                    <select disabled={x.stocks <= 0} value={x.qty} className="bg-gradient bg-light rounded mx-2"
                                                                        onChange={
                                                                            (e) => {
                                                                                cart[index].qty = Number(e.target.value)
                                                                                setcart([...cart])

                                                                                let tmp = cart.map((x) => {
                                                                                    return {
                                                                                        product: x._id,
                                                                                        qty: x.qty
                                                                                    }
                                                                                })

                                                                                localStorage.setItem("cartItems", JSON.stringify(tmp))
                                                                            }
                                                                        }
                                                                    >
                                                                        {
                                                                            [
                                                                                ...new Array(x.countInstock).keys()
                                                                            ].map((n) => (
                                                                                <option value={n + 1} key={n + 1}>{n + 1}</option>
                                                                            ))
                                                                        }
                                                                        {/* {
                                        [...new Array(x.countInStock).keys()].map((n) => (
                                          <option value={n + 1} key={n + 1}>{n + 1}</option>
                                        ))
                                      } */}
                                                                    </select>
                                                                    x ${x.price}
                                                                </div>

                                                            </p>
                                                            <p style={{ marginLeft: "5px" }} className={x.stocks > 0 ? "text-success" : "text-danger"}>{x.stocks > 0 ? "In-Stock" : "OutOff-Stock"}</p>
                                                        </div>
                                                        <div className="prodTotal cartSection">
                                                            <p>${x.qty * x.price}</p>
                                                        </div>
                                                        <div className="cartSection removeWrap">
                                                            <Link className="remove" onClick={() => RemoveHandler(x._id)}>
                                                                x
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </li>

                                            )
                                        })
                                    )
                                }



                            </ul>
                        </div>
                        <div className="promoCode cf">
                            <label htmlFor="promo">Have A Promo Code?</label>
                            <input type="text" name="promo" placholder="Enter Code" />

                            <div className="btn" />
                        </div>

                        <div className="subtotal cf">
                            <ul className='cf'>
                                <li className="totalRow">
                                    <span className="label">Products</span>
                                    <span className="value">{summarydetails.totalProducts}</span>
                                </li>
                                <li className="totalRow">
                                    <span className="label">Total Items</span>
                                    <span className="value">{summarydetails.totalitems}</span>
                                </li>
                                <li className="totalRow final">
                                    <span className="label">Total Amount</span>
                                    <span className="value">${summarydetails.totalAmount}</span>
                                </li>
                                <li className=" totalRow " onClick={ProceesToCheckout}>
                                    <Link className='btn continue'>
                                        Checkout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>




                )
            }
        </>


    )

}