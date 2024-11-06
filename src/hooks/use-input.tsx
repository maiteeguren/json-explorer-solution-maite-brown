import React, { useState, useEffect } from 'react';
import demodata from '../demo-data.json'

export const useInput = () => {
  const [inputProperty, setInputProperty] = useState('')
  const [inputResponse, setInputResponse] = useState('')

  const getReponse = (path: string) => {
    setInputResponse(String(undefined))

    /// Split path to get individual keys
    const parsedPath = path.split(/\[|\]|\./).filter(Boolean)
    let res = demodata

    parsedPath.forEach((field: string) => {
      // Ignore first field as it references the object itself
      if (field !== 'res') {
        res = res?.[field]
      }
    })

    // Hide arrays and hashes (i.e user types res.fields)
    if (typeof res !== 'object' || res === null) {
      setInputResponse(String(res))
    }
  }

  useEffect(() => {
    getReponse(inputProperty)
  }, [inputProperty])
  
  return { inputProperty, onChangeInput: setInputProperty, inputResponse, demodata }
}
