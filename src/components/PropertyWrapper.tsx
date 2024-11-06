import React from "react";
import { Data, Property } from "./types";

type Props = { onClick: () => void, property: Property, children: React.ReactNode, clickable: boolean }

export default function Wrapper({ property, children, onClick, clickable }: Props) {
  return (
    <div className="indented">
      {
        clickable ? (
          <button className="property-button"
            onClick={onClick}
          >{property}</button>
        ) : (
          <span>{property}</span>
        )
      }
      {': '}
      {children}
      {','}
    </div>
  )
}