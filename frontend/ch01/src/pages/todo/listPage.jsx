import { useSearchParams } from "react-router";

function ListPage() {

    const [queryParams] = useSearchParams()

    const page = queryParams.get("page")
    const size = queryParams.get("size")

    return (
      <div className="bg-white w-full">
        <div className="text-4xl">Todo List Page Component {page} --- {size}</div>
      </div>
     );
}

export default ListPage;