import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.colors.dark};
`

export const FormContainer = styled.View``

export const DateBtn = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.primary};
    height: ${RFValue(40)}px;
    width: 80%;
    margin: auto;
    border-radius:8px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const DateTitle = styled.Text`
    color: ${({theme}) => theme.colors.light};
    font-size: 18px;
    font-family: ${({theme})=> theme.fonts.bold};
`