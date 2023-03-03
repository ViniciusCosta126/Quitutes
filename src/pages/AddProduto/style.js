import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;


export const FormContainer = styled.View`
  margin-top: ${RFValue(30)}px;
`
