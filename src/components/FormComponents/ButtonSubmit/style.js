import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const BtnSubmit = styled.TouchableOpacity`
  width: 80%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.success};
  margin: auto;
  margin-top: ${RFValue(20)}px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TitleBtn = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.bold};
`;
