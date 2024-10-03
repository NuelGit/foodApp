import { createContext, useState } from "react";


const UserProgressContext = createContext({
    progress: ' ', 
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}
}) 

export function UserProgressContextProvider({children}){
    const [userProg, setUserProg] = useState('')

    function showCart () {
        setUserProg('cart')
    }

    function hideCart () {
        setUserProg('')
    }

    function showCheckout () {
        setUserProg('checkout')

    }
    function hideCheckout () {
        setUserProg('')
    }


    const userProgressCtx = {
        progress: userProg,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }
    
    return (
        <UserProgressContext.Provider value={userProgressCtx}>
            {children} 
        </UserProgressContext.Provider>
    )
}

export default UserProgressContext