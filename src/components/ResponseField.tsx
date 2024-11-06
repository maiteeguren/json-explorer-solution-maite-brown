import React from "react";
import { Data, OnChangeInput } from "./types";
import ResponseObject from "./ResponseObject";

type Props = { data: Data, onChangeInput: OnChangeInput }

const ASCII_CODES = {
    leftCurlyBracket: <>&#123;</>,
    rightCurlyBracket: <>&#125;</>,
  }

export default function ResponseField({ data, onChangeInput }: Props) {
    return (
        <div>
            <div className="label">Response</div>
            <div className="monospace text-box">
                <ResponseObject object={data} onChangeInput={onChangeInput} hideBrackets />
            </div>
        </div>
    )
}