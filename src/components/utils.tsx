import React, { useState, useEffect } from 'react';
import { Data, OnChangeInput, Property } from './types';
import ResponseObject from './ResponseObject';

const ASCII_CODES = {
  leftCurlyBracket: <>&#123;</>,
  rightCurlyBracket: <>&#125;</>,
  leftSquareBracket: <>&#91;</>,
  rightSquareBracket: <>&#93;</>,
}

export const getContent = (object: Data, key: Property, onChangeInput: OnChangeInput, path = 'res') => {
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
        const { leftCurlyBracket, rightCurlyBracket, leftSquareBracket, rightSquareBracket } = ASCII_CODES

        content =
          <>
            {leftSquareBracket}
            {object[key].map((elem: Data, index: number) => {
              const arrayPath = `${objectPath}[${index}]`

              return (
                <div key={arrayPath} className='indented'>
                  {leftCurlyBracket}
                  <ResponseObject object={elem} onChangeInput={onChangeInput} path={arrayPath} />
                  {rightCurlyBracket}
                </div>
              )
            }
            )}
            {rightSquareBracket}
          </>
        break
      }
    default:
      content = String(object[key])
      break
  }

  return { content, onClick, clickable }
}