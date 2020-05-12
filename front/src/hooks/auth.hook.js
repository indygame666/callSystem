import { useState, useCallback, useEffect} from "react"
import { useHttp } from "./http.hooks"

const storageName = 'userData'

export const useAuth = () =>{
    const [token,setToken] = useState(null)
    const [ready,setReady] = useState(false)
    const [userId,setUserId] = useState(null)
    const [decoded,setDecoded] = useState('')
    const {request} = useHttp()


    const login = useCallback( (jwtToken, id, data) =>{
        setToken(jwtToken)
        setUserId(id)
        setDecoded(data)

        localStorage.setItem(storageName,JSON.stringify({
            userId:id,
            token:jwtToken,
         //   decoded:data
        }))
    },[])

    const updateHandler = useCallback( async () => {
        
        try{
            const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token){
         
            const temp = data.token
            const jwt = await request('api/data/verify','POST', {temp} )

            login(data.token, data.userId, jwt.user)   

        }
        setReady(true)
        } catch(e) {

        }
    }, [login,request] )

    const logout = useCallback( () => {
        setToken(null)
        setUserId(null)
        setDecoded(null)
        localStorage.removeItem(storageName)
    },[])

    useEffect(() => {
    
        updateHandler()

    }, [updateHandler])

    return {login,logout,token,userId,decoded,ready}
}