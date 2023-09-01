import { Link, useNavigate } from "react-router-dom";

export default function Header({ token, setuserInfo, settoken, cartItems }) {

    const navigate = useNavigate()

    const clickToLogin = () => {
        return navigate("/")

    }
    const Logouthandler = () => {
        localStorage.removeItem("userInfo")
        localStorage.removeItem("token")
        setuserInfo({})
        settoken("")
    }




    return (
        <header className='bg-dark text-light px-3 d-flex align-items-center justify-content-between'>
            <div className="logo">
                <h3 className="mb-0 fw-bold">amazon</h3>
            </div>

            <div className='d-flex gap-2 align-items-center py-2 text-light'>
                <Link to={"/Addtocart"}>
                    <i style={{ fontSize: "3.2rem", marginTop: "12px" }} className="fa-brands fs-5 fa-opencart icoon text-light position-relative">

                        <span style={{ fontSize: ".5rem" }} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cartItems.length}
                        </span>
                    </i>
                </Link>
                <Link className={""} to={`/`}>
                    <button type="button" className="btn btn-warning fw-bold bg-gradient"
                        onClick={token ? Logouthandler : clickToLogin} >
                        {
                            token ? "signout" : "signin"
                        }

                    </button>
                </Link>

                <Link className={""} to={`/Registration`}>  <button type="button" className="btn btn-warning fw-bold bg-gradient">Create Account</button>
                </Link>

            </div>



        </header>
    )
}
