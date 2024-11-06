import React from "react";
import "./styles.css";
import ResponseField from './components/ResponseField'
import InputField from "./components/InputField";
import { useInput } from "./hooks/use-input";

export default function App() {
 const { inputProperty, onChangeInput, inputResponse, demodata } = useInput()

  return (
    <div className="App">
      <InputField inputProperty={inputProperty} onChangeInput={onChangeInput} inputResponse={inputResponse} />
      <ResponseField data={demodata} onChangeInput={onChangeInput} />
    </div>
  );
}
