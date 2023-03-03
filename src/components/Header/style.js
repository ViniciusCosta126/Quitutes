import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
export const Header = styled.View`
  padding: ${RFValue(60)}px ${RFValue(20)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Title = styled.Text`
  text-align: center;
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.light};
  padding-top: ${RFValue(30)}px;
`;