import React from "react";

export default function Wrapper({ property, children, onClick, clickable }: { onClick: () => void, property: string, children: React.ReactNode, clickable: boolean }) {
  return (
    <div className="indented">
      <span className={clickable ? "clickable-property" : ""}
        onClick={clickable ? () => onClick() : () => { }}
      >{property}: </span>
      {children}
      {','}
    </div>
  )
}