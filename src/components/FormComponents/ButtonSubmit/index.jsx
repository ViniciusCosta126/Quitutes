import React from "react";
import * as C from "./style";
export const BtnSubmit = ({ title,onPress }) => {
  const handle = ()=>{
    console.log("aqui funciona")
  }
  return (
    <C.BtnSubmit onPress={onPress}>
      <C.TitleBtn>{title}</C.TitleBtn>
    </C.BtnSubmit>
  );
};
