import React from "react";
import { Property } from "./types";

type Props = { onClick: () => void, property: Property, children: React.ReactNode, clickable: boolean, path: string }

export default function PropertyWrapper({ property, children, onClick, clickable, path }: Props) {
  return (
    <div className="indented">
      {
        clickable ? (
          <>
            <label htmlFor={path} hidden>Click to display {path}</label>
            <button
              className="property-button"
              onClick={onClick}
              data-testid={path}
              id={path}
            >{property}</button>
          </>
        ) : (
          <span data-testid={path}>{property}</span>
        )
      }
      {': '}
      {children}
    </div>
  )
}