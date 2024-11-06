import React, { SetStateAction, useEffect, useState } from "react";
import "./styles.css";
import demodata from "./demo-data.json";
import ResponseField from './components/ResponseField'
import InputField from "./components/InputField";

export default function App() {
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

  return (
    <div className="App">
      <InputField inputProperty={inputProperty} onChangeInput={setInputProperty} inputResponse={inputResponse} />
      <ResponseField data={demodata} onChangeInput={setInputProperty} />
    </div>
  );
}
