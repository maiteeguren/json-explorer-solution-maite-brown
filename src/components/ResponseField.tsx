import React from "react";
import { Data, OnChangeInput } from "./types";
import MappedObject from "./MappedObject";

type Props = { data: Data, onChangeInput: OnChangeInput }

export default function ResponseField({ data, onChangeInput }: Props) {
    return (
        <div>
            <div className="label">Response</div>
            <div className="monospace text-box">
                <MappedObject object={data} onChangeInput={onChangeInput} hideBrackets />
            </div>
        </div>
    )
}