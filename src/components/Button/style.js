import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const BtnPrimary = styled.TouchableOpacity`
width: 200px;
height: 60px;
background-color: ${({theme}) => theme.colors.primary};
border-radius: 6px;
border: 2px solid ${({theme}) => theme.colors.secondary};
margin: ${RFValue(10)}px auto;
padding: 12px 8px;
`
export const TextBtn = styled.Text`
text-align: center;
font-size: 18px;
font-family: ${({theme})=> theme.fonts.bold};
color:${({theme}) => theme.colors.light};
`