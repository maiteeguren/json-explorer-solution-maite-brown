import React, { SetStateAction, useEffect, useState } from "react";
import "./styles.css";
import demodata from "./demo-data.json";
import PropertyWrapper from "./components/PropertyWrapper";

type Data = Record<string, any>

export default function App() {
  const [inputProperty, setInputProperty] = useState('')
  const [inputResponse, setInputResponse] = useState<SetStateAction<string>>('')

  
  const getReponse = (path: string) => {
    setInputResponse('')

    /* Split path to get individual key */
    const parsedPath = path.split(/\[|\]|\./).filter(Boolean)    
    let res = demodata

    parsedPath.forEach((field: string) => {
      // Ignore 
      if (field !== 'res') {
        res = res[field]
      }
    })
    
    setInputResponse(String(res))
  }

  useEffect(() => {
    getReponse(inputProperty)
  }, [inputProperty])

  const getContent = (object: Data, key: string, path = 'res') => {
    const objectPath: string = `${path}.${key}`
    let onClick = () => {
      setInputProperty(objectPath)
    }
    let clickable = true
    let content

    switch (typeof object[key]) {
      case "string":
        content = `'${object[key]}'`
        break
      case "object":     
        if (Array.isArray(object[key])) {
          clickable = false
          onClick = () => {}

          content = <>&#91;
          {object[key].map((elem: Data, index: number) => <div key={`${objectPath}-${index}`}>&#123;{iterateObject(elem, `${objectPath}[${index}]`)}&#125;</div>)}
          &#93;
          </>
          break
        }
      default:
          content = String(object[key])
          break
    }

    return { content, onClick, clickable}
  }

  const iterateObject = (object: Data, path?: string) => {
    return Object.keys(object).map((key) => {
      const { content, onClick, clickable} = getContent(object, key, path)

      return (
        <PropertyWrapper key={key} property={key} onClick={onClick} clickable={clickable}>
          {content}
        </PropertyWrapper>)
    });
  };

  return (
    <div className="App">
      <div>
        <label htmlFor="property-input" className="label">Property</label>
        <input type="text" id="property-input" className="monospace text-box" value={inputProperty} onChange={(e) => setInputProperty(e.target.value)}/>
      </div>
      <div className="monospace response">
        <>{inputResponse}</>
      </div>
      <div>
        <div className="label">Response</div>
        <div className="monospace text-box">{iterateObject(demodata)}</div>
      </div>
    </div>
  );
}
