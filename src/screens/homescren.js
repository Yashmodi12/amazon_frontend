import { useEffect, useState } from "react"
import Card from "../Components/card"
import apiHelper from "../comn/ApiHelper"



export default function Homescreen() {

    const [products, setProdcuts] = useState([])

    const GetProduct = async () => {

        try {
            const result = await apiHelper.fetchproducts()
            setProdcuts(result.data.products)
        }
        catch (error) {
            console.log(error)

        }
    }


    useEffect(() => { GetProduct() }, [])

    return (
        <div className="container py-3">
            <h5>feture products</h5>



            <div className="d-flex mt-1 flex-wrap gap-3 justify-content-md-start ">
                {
                    products.map((product) => {
                        return <Card key={product.id} product={product} />
                    }
                    )
                }
            </div>
        </div>  
    )

}