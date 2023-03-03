import React from "react";
import * as C from "./style";
export const Input = ({
  placeholder,
  autoCorrect,
  inputMode,
  keyboardType,
  value,
  onChangeItem
}) => {
  return (
    <C.Container>
      <C.Input
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        inputMode={inputMode}
        keyboardType={keyboardType ? "default" : keyboardType}
        placeholderTextColor="#a8a8b3"
        onChangeText= {(e)=> onChangeItem(e)}
        value={value}
      />
    </C.Container>
  );
};
