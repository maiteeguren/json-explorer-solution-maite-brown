import React from "react";
import { OnChangeInput } from "./types";

type Props = { inputProperty: string, onChangeInput: OnChangeInput, inputResponse: string }

export default function InputField({ inputProperty, onChangeInput, inputResponse }: Props) {
    return (
        <div>
            <label htmlFor="property-input" className="label">Property</label>
            <input type="text" id="property-input" className="monospace text-box" value={inputProperty} onChange={(e) => onChangeInput(e.target.value)} />
            <div className="monospace property-response-field">
                <>{inputResponse}</>
            </div>
        </div>
    )
}