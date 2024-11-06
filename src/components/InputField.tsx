import React from "react";
import { Property, OnChangeInput, PropertyValue } from "./types";

type Props = { inputProperty: Property, onChangeInput: OnChangeInput, inputResponse: PropertyValue }

export default function InputField({ inputProperty, onChangeInput, inputResponse }: Props) {
    return (
        <div>
            <div className="label">Response</div>
            <label htmlFor="property-input" hidden>Enter a property name to display its value</label>
            <input type="text" id="property-input" data-testid='input-field' className="monospace text-box" value={inputProperty} onChange={(e) => onChangeInput(e.target.value)} />
            <div className="monospace property-response-field" data-testid='property-response-field'>
                <>{inputResponse}</>
            </div>
        </div>
    )
}