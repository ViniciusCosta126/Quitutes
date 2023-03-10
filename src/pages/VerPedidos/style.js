import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

export const FilterContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${RFValue(8)}px;
  margin-top: ${RFValue(20)}px;
`;

export const BtnFilter = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 20%;
  box-sizing: border-box;
  padding: ${RFValue(8)}px ${RFValue(4)}px;
  border-radius: 8px;
`;
export const BtnFilterText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 12px;
`;
export const PedidosContainer = styled.View`
  position: relative;
  flex: 1;
`;

export const ListPedidos = styled.FlatList``;

export const PedidoView = styled.View`
  padding: ${RFValue(8)}px;
  border: 1px solid
    ${({ theme, feito }) => (feito ? theme.colors.success : theme.colors.light)};
  width: 90%;
  margin: 8px auto 10px;
  border-radius: 8px;
`;
export const PedidoTitle = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: 4px;
`;
export const ItensList = styled.FlatList`
  border: 1px solid #fff;
  padding: 4px;
  border-radius: 4px;
  box-sizing: border-box;
`;
export const ItemContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
export const ItemText = styled.Text`
  margin-right: 4px;
  color: #fff;
  text-decoration: ${(props) => (props.feito ? "dashed" : "")};
`;
export const BtnCheck = styled.TouchableOpacity`
  background-color: ${({ theme, feito }) =>
    feito ? theme.colors.success : theme.colors.light};
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 20px;
  top: 10px;
  border-radius:4px;
`;
export const TitlePedido = styled.Text`
  text-align: center;
  margin: 8px;
  color: ${({ theme }) => theme.colors.light};
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
export const BtnDelete = styled.TouchableOpacity`
  background-color: ${({theme})=> theme.colors.light};
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 50px;
  top: 10px;border-radius:4px;
`
export const BtnPay = styled.TouchableOpacity`
  background-color: ${({theme})=> theme.colors.light};
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 9px;
  right: 20px;
  border-radius:4px;
`