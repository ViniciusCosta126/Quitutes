import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.colors.dark};
`
export const ContainerDate = styled.View`
    display: flex;
    flex-direction:row;
    margin-top: ${RFValue(20)}px;
    align-items: center;
    justify-content: center;
`
export const DateTitle = styled.Text`
    font-size: 24px;
    color: ${({theme})=> theme.colors.light};
    font-family:${({theme})=> theme.fonts.bold};
    margin: 0 ${RFValue(20)}px;
`
export const BtnAddDate = styled.TouchableOpacity`
    background-color: ${({theme})=> theme.colors.primary};
    border-radius: 100px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const ContainerValores = styled.View`
    width: 90%;
    border: 1px solid #fff;
    margin-top: ${RFValue(40)}px;
    padding: ${RFValue(20)}px;
    margin-left:auto;
    margin-right: auto;
    border-radius: 16px;
`
export const ValoresText = styled.Text`
    font-size: 15px;
    color: ${({theme})=> theme.colors.light};
    font-family:${({theme})=> theme.fonts.bold};
    margin-bottom: ${RFValue(8)}px;
`