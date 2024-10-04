import React, { useCallback, useEffect, useState } from 'react'


async function sendHttprequest (url, config) {
    const res = await fetch(url, config)

    const resData = await res.json()

    if (!res.ok){
        throw new Error( resData.message || 'Something went wrong!')
    }

    return resData
}

export default function useHttp ( url, config, initialData ) {

     const [ data, setData ] = useState(initialData)
     const [ error, setError ] = useState()
     const [ isLoading, setIsLoading ] = useState(false)

  const sendNewReq = useCallback(
    async function sendRequest() {
        setIsLoading(true)

    try {
        
        const newResData = await sendHttprequest(url, config)
        setData(newResData)

    } catch (error) {
        setError(error.message || ' Something Went Wrong' )
        
    }
    setIsLoading(false)

    }, [url, config])

    useEffect(() => {
        if ((config && (config.method ==='GET' || !config.method)) || !config ) {
            sendNewReq()
        }

    }, [ sendNewReq, config ])


  return {
    data,
    isLoading,
    error,
    sendNewReq
    

  }
    
  
}

