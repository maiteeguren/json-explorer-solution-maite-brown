import React from 'react';
import { Data, OnChangeInput, Property } from './types';
import MappedObject from './MappedObject';

const ASCII_CODES = {
  leftSquareBracket: <>&#91;</>,
  rightSquareBracket: <>&#93;</>,
}

export const getContent = (object: Data, key: Property, onChangeInput: OnChangeInput, path = 'res') => {
  const { leftSquareBracket, rightSquareBracket } = ASCII_CODES
  const objectPath: string = typeof key === 'number' ? `${path}[${key}]` : `${path}.${key}`
  const onClick = () => onChangeInput(objectPath)
  let clickable = true
  let content

  switch (typeof object[key]) {
    case "string":
      content = `'${object[key]}',`
      break
    case "object":
      if (Array.isArray(object[key])) {
        clickable = false
        content =
          <>
            {leftSquareBracket}
            {object[key].map((elem: Data, index: number): any => {
              const { content: elemContent } = getContent(object[key], index, onChangeInput, objectPath)
              return elemContent
            })}
            {rightSquareBracket}
            {','}
          </>
        break
      } else if (object[key]) {
        // This is not needed for this demo but in case the object is not null/array
        clickable = false
        content =
          <MappedObject object={object[key]} onChangeInput={onChangeInput} path={objectPath} />
        break
      }
    default:
      content = String(object[key]) + ','
      break
  }

  return { content, onClick, clickable, objectPath }
}