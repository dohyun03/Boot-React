import { useCallback, useState } from "react"
import { createSearchParams, useNavigate, useSearchParams } from "react-router"

const useCustomMove = () => {

  const navigate = useNavigate()

  const [refresh, setRefresh] = useState(false) //추가

  const [queryParams] = useSearchParams()

  const pageStr = queryParams.get('page')
  const sizeStr = queryParams.get('size')

  const page = pageStr ? Number(pageStr) : 1
  const size = sizeStr ? Number(sizeStr) : 10

  const queryDefault = createSearchParams({
    page: String(page),
    size: String(size),
  }).toString()

  const moveToList = (pageParam) => {

    let queryStr = ''

    if (pageParam) {
      const pageNum = Number(pageParam.page || 1)
      const sizeNum = Number(pageParam.size || 10)

      queryStr = createSearchParams({
        page: String(pageNum),
        size: String(sizeNum),
      }).toString()

      //동일 페이지 클릭
      if(queryStr === queryDefault){
         setRefresh(!refresh)
      }
    } else {
      queryStr = queryDefault
    }

    navigate({ pathname: `../list`, search: queryStr })
  }

  const moveToModify = useCallback((num) => {

    console.log(queryDefault)

    navigate({ pathname: `../modify/${num}`, search: queryDefault })

  },[page,size])

  const moveToRead = (tno) => {

    navigate({
      pathname: `../read/${tno}`,
      search: queryDefault
    })
  }

  return {page,size, moveToList, moveToModify, moveToRead, refresh}
}

export default useCustomMove