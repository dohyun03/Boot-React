import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import useCustomLogin from "./useCustomLogin"
import { getCartItemsAsync, postChangeCartAsync } from "../slices/cartSlice"

function useCustomCart() {

  const {loginState, loginStatus} = useCustomLogin()

  const cartItems = useSelector( (state) => state.cartSlice)

  const dispatch = useDispatch()

  useEffect(() => {
    if(loginStatus) {
      dispatch(getCartItemsAsync())
    }
  },[loginStatus])

  const changeCart = (cino, pno, amount) => {

    const email = loginState.email

    let qty = 1

    if(cino){
      const targetArr = cartItems.items.filter(item => item.cino === cino)

      if(targetArr.length > 0) {
        qty = targetArr[0].qty + amount
      }
    }

    const requestItem = cino ? {email, cino, pno, qty } : {email, pno, qty}

    console.log(requestItem)

    dispatch(postChangeCartAsync(requestItem))
  }

  return {loginState, loginStatus, cartItems, changeCart}
}

export default useCustomCart