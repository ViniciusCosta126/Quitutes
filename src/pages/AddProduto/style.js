import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;


export const FormContainer = styled.View`
  margin-top: ${RFValue(30)}px;
`
export const ListContainer = styled.View`
flex: 1;
`
export const List = styled.FlatList`
  border: 1px solid #fff;
  width: 90%;
  margin: ${RFValue(20)}px auto 5px ;
  padding: ${RFValue(10)}px;
  border-radius: 8px;

`
export const ItemContainer = styled.View`
  border: 1px solid #fff;
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  position: relative;
`
export const ItemText = styled.Text`
color: ${({theme})=> theme.colors.light};
font-family: ${({theme})=> theme.fonts.bold};
margin-right: 12px;
`
export const BtnDelete = styled.TouchableOpacity`
  background-color:${({theme})=> theme.colors.light} ;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  position: absolute;
  right: 20px;
  top: 6px;
`