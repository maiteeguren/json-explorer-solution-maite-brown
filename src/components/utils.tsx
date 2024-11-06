import React from 'react';
import { Data, OnChangeInput, Property } from './types';
import ResponseObject from './ResponseObject';

const ASCII_CODES = {
  leftSquareBracket: <>&#91;</>,
  rightSquareBracket: <>&#93;</>,
}

export const getContent = (object: Data, key: Property, onChangeInput: OnChangeInput, path = 'res') => {
  const { leftSquareBracket, rightSquareBracket } = ASCII_CODES
  const objectPath: string = `${path}.${key}`
  const onClick = () => onChangeInput(objectPath)
  let clickable = true
  let content

  switch (typeof object[key]) {
    case "string":
      content = `'${object[key]}'`
      break
    case "object":
      if (Array.isArray(object[key])) {
        clickable = false
        content =
          <>
            {leftSquareBracket}
            {object[key].map((elem: Data, index: number) =>
              <ResponseObject
                object={elem}
                onChangeInput={onChangeInput}
                path={`${objectPath}[${index}]`}
              />)}
            {rightSquareBracket}
          </>
        break
      } else if (object[key]) {
        // This is not needed for this demo but in case the object is not null/array
        clickable = false
        content =
          <ResponseObject object={object[key]} onChangeInput={onChangeInput} path={objectPath} />
        break
      }
    default:
      content = String(object[key])
      break
  }

  return { content, onClick, clickable, objectPath }
}