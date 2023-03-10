import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Header } from "../../components/Header";
import { Orders } from "../../context/pedidosContext";
import * as C from "./style";
export const VerFaturamento = () => {
  const { pedidos } = useContext(Orders);
  let months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const [dateAtual, setDateAtual] = useState(new Date());
  const [monthFilter, setMonthFilter] = useState(dateAtual);
  const [pedidosFiltered, setPedidosFiltered] = useState(pedidos)
  const [total,setSomaTotal] = useState(0)
  useEffect(()=>{
    filterPedidos()
  },[])
  const handleNextMonth = () => {
    const newMonth = monthFilter;
    if (newMonth.getMonth() + 1 > 11) {
      newMonth.setMonth(newMonth.getMonth() - 11);
      newMonth.setFullYear(newMonth.getFullYear() + 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
     
    }
    setMonthFilter(newMonth);
    filterPedidos()
  };
  const handleBeforeMonth =()=>{
    const newMonth = monthFilter;
    if (newMonth.getMonth() - 1 < -1) {
      newMonth.setMonth(newMonth.getMonth() + 11);
      newMonth.setFullYear(newMonth.getFullYear() - 1);
      
    } else {
      newMonth.setMonth(newMonth.getMonth() - 1);
    }
    setMonthFilter(newMonth);
    filterPedidos()
  }
  const filterPedidos = ()=>{
    const newList = pedidos.filter(pedido=>{
      let dateFormatA = pedido.data.split('/')
      dateFormatA = `${dateFormatA[2]}-${dateFormatA[1]}-${dateFormatA[0]}`;
      let orderDate = new Date(dateFormatA) 
      return orderDate.getMonth() === monthFilter.getMonth() && orderDate.getFullYear() === monthFilter.getFullYear()
    })
    setPedidosFiltered(newList)
    handleSomaTotal(newList)
  }
  const handleSomaTotal = (newList) =>{
    var somatotal = 0
    newList.map(({listProducts}) =>{
      listProducts.map(item=>{
        somatotal += item.product.valor * item.qtd
      })
    })
    setSomaTotal(somatotal.toFixed(2))
  }
  return (
    <C.Container>
      <Header title="Faturamento" />
      <C.ContainerDate>
        <C.BtnAddDate onPress={handleBeforeMonth}>
          <Icon name="navigate-before" size={30} color={"#fff"} />
        </C.BtnAddDate>
        <C.DateTitle>{`${months[monthFilter.getMonth()]}/${monthFilter.getFullYear()}`}</C.DateTitle>
        <C.BtnAddDate onPress={handleNextMonth}>
          <Icon name="navigate-next" size={30} color={"#fff"} />
        </C.BtnAddDate>
      </C.ContainerDate>
      <C.ContainerValores>
        <C.ValoresText>Você teve um total de {pedidosFiltered.length} {pedidosFiltered.length > 1 ? "pedidos" : "pedido"} este mês </C.ValoresText>
        <C.ValoresText>Você Faturou: R${total}</C.ValoresText>
        <C.ValoresText>Você Gastou: R${(1000).toFixed(2)}</C.ValoresText>
        <C.ValoresText>Seu faturamento liquido foi: R${(total-1000).toFixed(2)}</C.ValoresText>
      </C.ContainerValores>
    </C.Container>
  );
};
