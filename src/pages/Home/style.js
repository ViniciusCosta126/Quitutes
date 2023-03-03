import React from 'react';
import styled from 'styled-components/native';
import { RFValue,RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.dark};
`
export const Header = styled.View`
    padding: ${RFValue(60)}px ${RFValue(20)}px;
    width: 100%;
`
export const TitleContainer = styled.View`
    width: ${RFValue(160)}px;
    height: ${RFValue(160)}px;
    border-radius: 100px;
    background-color: ${({theme}) => theme.colors.primary};
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Title = styled.Text`
    font-size: 34px;
    max-width: 130px;
    text-align: center;
    color: ${({theme}) => theme.colors.secondary};;
    font-family:${({theme})=> theme.fonts.regular};
`
export const ContentContainer = styled.View`
margin-top: ${RFValue(16)}px;
`