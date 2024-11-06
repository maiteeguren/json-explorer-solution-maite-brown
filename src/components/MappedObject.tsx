import React from "react";
import { Data, OnChangeInput } from "./types";
import { getContent } from "./utils";
import MappedPropertyWrapper from './MappedPropertyWrapper'

type Props = { object: Data, onChangeInput: OnChangeInput, path?: string, hideBrackets?: boolean }

const ASCII_CODES = {
  leftCurlyBracket: <>&#123;</>,
  rightCurlyBracket: <>&#125;</>,
}

export default function MappedObject({ object, onChangeInput, path, hideBrackets = false }: Props) {
  const { leftCurlyBracket, rightCurlyBracket } = ASCII_CODES

  return (
    <div key={path} className='indented'>
      {!hideBrackets && leftCurlyBracket}
      {Object.keys(object).map((key) => {
        const { content, onClick, clickable, objectPath } = getContent(object, key, onChangeInput, path)

        return (
          <MappedPropertyWrapper key={key} property={key} onClick={onClick} clickable={clickable} path={objectPath}>
            {content}
          </MappedPropertyWrapper>
        )
      })}
      {!hideBrackets && rightCurlyBracket}
    </div>
  )
};