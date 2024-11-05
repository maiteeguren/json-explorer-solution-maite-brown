import React, { useState } from "react";
import "./styles.css";
import demodata from "./demo-data.json";
import PropertyWrapper from "./components/PropertyWrapper";

type Data = Record<string, any>

export default function App() {
  const [input, setInput] = useState('')
  const [resp, setRespt] = useState(null)

  
  const handleClick = (path: (string | number)[]) => {
    let res = demodata
    let parsedPath = 'res'
    
    path.forEach((field: string | number) => {
      res = res[field]
      parsedPath = (typeof field === 'string' ? `${parsedPath}.${field}` : `${parsedPath}[${field}]`)
    })

    setInput(parsedPath)
    // @ts-ignore
    setRespt(String(res))
  }

  const getContent = (object: Data, key: string, path?: (string| number)[]) => {
    const objectPath: (string| number)[] = path ? [...path, key] : [key]
    let onClick = () => handleClick(objectPath)
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
          {object[key].map((elem: Data, index: number) => <div key={`${objectPath}-${index}`}>&#123;{iterateObject(elem, [...objectPath, index])}&#125;</div>)}
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

  const iterateObject = (object: Data, path?: (string| number)[]) => {
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
        <input type="text" id="property-input" value={input} className="monospace text-box"/>
      </div>
      <div className="monospace response">
        {resp}
      </div>
      <div>
        <div className="label">Response</div>
        <div className="monospace text-box">{iterateObject(demodata)}</div>
      </div>
    </div>
  );
}
