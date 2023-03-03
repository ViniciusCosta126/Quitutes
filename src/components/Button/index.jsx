import React from 'react'
import * as C from './style'
import { useNavigation } from '@react-navigation/native';

export const Button = ({textoBtn, titlePage}) => {
  const {navigate} = useNavigation()
  return (
    <C.BtnPrimary activeOpacity={0.3}>
        <C.TextBtn onPress={()=>navigate(titlePage)}>{textoBtn}</C.TextBtn>
    </C.BtnPrimary>
  )
}

