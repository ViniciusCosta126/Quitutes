import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";


export const Container = styled.View`
    width: 80%;
    margin: 10px auto;
`

export const Input = styled.TextInput`
    padding: ${RFValue(10)}px;
    width: 100%;
    border: 1px solid #fff;
    border-radius:10px;
    color: ${({theme})=> theme.colors.light};
    font-family: ${({theme})=> theme.fonts.bold};
`