import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.dark};
`
export const FormContainer = styled.View`
    width: 100%;
    margin: 30px auto;
    padding: 0 ${RFValue(4)}px;
`
export const SearchBar = styled.TextInput`
    padding: ${RFValue(10)}px;
    width: 100%;
    border: 1px solid #fff;
    border-radius:10px;
    color: ${({theme})=> theme.colors.light};
    font-family: ${({theme})=> theme.fonts.bold};
    margin-bottom: 16px;
`
export const List = styled.FlatList`
    background-color:${({theme}) => theme.colors.gray800} ;
    margin-bottom: 16px;
    padding:${RFValue(4)}px ;
    border-radius: 6px;
    padding-bottom: 8px;
`
export const ItemBtn = styled.TouchableOpacity`
    border: 1px solid #fff;
    border-radius:4px;
    padding: ${RFValue(4)}px ${RFValue(10)}px;
    margin-top: 8px;
`
export const ItemText = styled.Text`
    color: ${({theme})=> theme.colors.light};
    font-family: ${({theme})=> theme.fonts.bold};
`
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
export const ListProducts = styled.FlatList`
    height: ${RFValue(140)}px;
    margin-bottom: 16px;
    padding:${RFValue(4)}px ;
    border-radius: 6px;
`
export const ProductItemBtn=styled.View`
border: 1px solid #fff;
border-radius:4px;
padding: ${RFValue(4)}px ${RFValue(10)}px;
margin-top: 8px;
display: flex;
flex-direction: row;
justify-content: space-between;
`
export const ProductItemText = styled.Text`
    color: ${({theme})=> theme.colors.light};
    font-family: ${({theme})=> theme.fonts.bold};
    font-size: 12px;
    width: 75%;
`
export const ProductItemQtd = styled.Text`
  color: ${({theme})=> theme.colors.light};
    font-family: ${({theme})=> theme.fonts.bold};
    font-size: 12px;
`