import { useLoaderData } from "react-router";
import ReadComponent from "../../components/products/readComponent";
import jwtAxios from "../../util/jwtUtil";

export async function loadProduct({params}) {

    const {pno} = params

    const res = await jwtAxios.get(`http://localhost:8080/api/products/${pno}`)

    return res.data
}

function ReadPage() {

    const product = useLoaderData()

    console.log(product)

    return (
      <div className="w-full">
        <div className="text-3xl font-extrabold">Product Read</div>

        <ReadComponent product={product}></ReadComponent>
      </div>
    )
}

export default ReadPage