import React from "react";
import { Property, OnChangeInput, PropertyValue } from "./types";

type Props = { inputProperty: Property, onChangeInput: OnChangeInput, inputResponse: PropertyValue }

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