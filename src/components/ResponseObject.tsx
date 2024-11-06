import React from "react";
import { Data, OnChangeInput } from "./types";
import { getContent } from "./utils";
import PropertyWrapper from './PropertyWrapper'

type Props = { object: Data, onChangeInput: OnChangeInput, path?: string }

export default function ResponseObject({ object, onChangeInput, path }: Props) {
  return (
    <div>
      {Object.keys(object).map((key) => {
        const { content, onClick, clickable } = getContent(object, key, onChangeInput, path)

        return (
          <PropertyWrapper key={key} property={key} onClick={onClick} clickable={clickable}>
            {content}
          </PropertyWrapper>
        )
      })}
    </div>
  )
};