import React, { useContext, useEffect, useMemo, useState } from "react";
import * as C from "./style";
import { Header } from "../../components/Header";
import { Orders } from "../../context/pedidosContext";
import Icon from 'react-native-vector-icons/Feather'
import { SafeAreaView } from "react-native";
export const VerPedidos = () => {
  const { pedidos,handleIsDone } = useContext(Orders);
  const [pedidosFiltered,setPedidosFiltered] = useState(pedidos)
  const [title, setTitle] = useState("Todos os Pedidos")
  
  const handleTotal = (pedidos)=>{
    var somatotal = 0
    pedidos.map(pedido =>{
      return somatotal+= pedido.product.valor * pedido.qtd
    })
    return somatotal.toFixed(2)
  }
  const handleFilterFeitos = () => {
    const newList = pedidos.filter(pedido=>{
      if(pedido.is_done){
        return pedido
      }
    })
    setTitle("Pedidos Concluidos")
    setPedidosFiltered(newList)
  }
  const handleFilterFazer = () => {
    const newList = pedidos.filter(pedido=>{
      if(pedido.is_done === false){
        return pedido
      }
    })
    setTitle("Pedidos a Fazer")
    setPedidosFiltered(newList)
  }
  const handleTodos = ()=>{
    setPedidosFiltered(pedidos)
    setTitle("Todos os pedidos")
  }
  const handleCheck = (id)=>{
    const newList = pedidosFiltered.map(pedido=>{
      if(id === pedido.id){
        return {
          ...pedido,
          is_done:!pedido.is_done
        }
      }
      return pedido
    })
    setPedidosFiltered(newList)
    handleIsDone(id)
  }
  const ordenarPorData = ()=>{
    const newList = pedidosFiltered.sort((a,b)=> {
      const newDateA = a.data
      const newDateB = b.data
      let dateFormatA = newDateA.split('/')
      let dateFormatB = newDateB.split('/')
      dateFormatA = `${dateFormatA[2]}-${dateFormatA[1]}-${dateFormatA[0]}`;
      dateFormatB = `${dateFormatB[2]}-${dateFormatB[1]}-${dateFormatB[0]}`;
      return new Date(dateFormatA) - new Date (dateFormatB)
    })
    setPedidosFiltered(newList)
  }
  return (
    <C.Container>
      <Header title="Pedidos Realizados" />
      <C.FilterContainer>
        <C.BtnFilter onPress={ordenarPorData}>
          <C.BtnFilterText>Data de entrega</C.BtnFilterText>
        </C.BtnFilter>
        <C.BtnFilter>
          <C.BtnFilterText onPress={handleTodos}>Todos os Pedidos</C.BtnFilterText>
        </C.BtnFilter>
        <C.BtnFilter>
          <C.BtnFilterText onPress={handleFilterFazer}>Pedidos a fazer</C.BtnFilterText>
        </C.BtnFilter>
        <C.BtnFilter>
          <C.BtnFilterText onPress={handleFilterFeitos}>Pedidos Concluidos</C.BtnFilterText>
        </C.BtnFilter>
      </C.FilterContainer>

      <C.PedidosContainer>
        <C.TitlePedido>
            {title}
        </C.TitlePedido>
        <SafeAreaView>
        <C.ListPedidos
          data={pedidosFiltered}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => (
            <C.PedidoView feito={item.is_done}>
              <C.PedidoTitle>
                {item.cliente} | {item.telefone}
              </C.PedidoTitle>
              <C.PedidoTitle>Data de entrega: {item.data}</C.PedidoTitle>
              <C.ItensList
                data={item.listProducts}
                renderItem={({ item }) => (
                  <C.ItemContainer>
                    <C.ItemText>{item.product.produto}</C.ItemText>
                    <C.ItemText>| R${parseFloat(item.product.valor).toFixed(2)}</C.ItemText>
                    <C.ItemText>| Qtd: {item.qtd}</C.ItemText>
                  </C.ItemContainer>
                )}
                keyExtractor={(item) => item.product.id.toString()}
              />
              <C.PedidoTitle>Total: R${handleTotal(item.listProducts)}</C.PedidoTitle>
              <C.BtnCheck onPress={()=>handleCheck(item.id.toString())}  feito={item.is_done}>
                  <Icon name="check" size={16} color={item.is_done ? "#fff" : "#000"}/>
              </C.BtnCheck>
            </C.PedidoView>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        </SafeAreaView>
      </C.PedidosContainer>
    </C.Container>
  );
};
