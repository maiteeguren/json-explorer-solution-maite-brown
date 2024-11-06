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

    // Only display strings, numbers, boolean and undefined types
    if (typeof res !== 'object') {
      setInputResponse(String(res))
    }
  }

  useEffect(() => {
    getReponse(inputProperty)
  }, [inputProperty])
  
  return { inputProperty, onChangeInput: setInputProperty, inputResponse, demodata }
}
