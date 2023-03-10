import React from 'react';
import { Button } from '../../components/Button';
import * as C from './style'

export default Home = () => {
  return (
    <C.Container>
      <C.Header>
        <C.TitleContainer>
          <C.Title>Quitutes de Venus</C.Title>
        </C.TitleContainer>
        <C.ContentContainer>
          <Button textoBtn={"Adicionar Pedido"} titlePage="AddPedido"/>
          <Button textoBtn={"Adicionar Produto"} titlePage="AddProduto"/>
          <Button textoBtn={"Ver Pedidos"} titlePage="VerPedidos"/>
          <Button textoBtn={"Ver Faturamento"} titlePage="VerFaturamento"/>
        </C.ContentContainer>
      </C.Header>
     
    </C.Container>
  )
}

