import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Header } from "../../components/Header";
import { Despesas } from "../../context/despesasContext";
import { Orders } from "../../context/pedidosContext";
import { beforeMonth, filterData, nextMonth, somaTotal } from "../../utils";
import * as C from "./style";
export const VerFaturamento = () => {
  const { pedidos } = useContext(Orders);
  const { despesas } = useContext(Despesas);
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
  const [pedidosFiltered, setPedidosFiltered] = useState(pedidos);
  const [despesasFiltered, setDespesasFiltered] = useState(despesas);
  const [total, setSomaTotal] = useState(0);
  const [totalDespesa, setTotalDespesa] = useState(0);

  useEffect(() => {
    filterPedidos();
  }, []);

  const handleNextMonth = () => {
    setMonthFilter(nextMonth(monthFilter));
    filterPedidos();
  };

  const handleBeforeMonth = () => {
    setMonthFilter(beforeMonth(monthFilter));
    filterPedidos();
  };

  const filterPedidos = () => {
    const newList = filterData(pedidos, monthFilter)
    const newListDspesas = filterData(despesas, monthFilter)
    setPedidosFiltered(newList);
    setDespesasFiltered(newListDspesas);
    handleSomaTotal(newList,newListDspesas);
  };

  const handleSomaTotal = (newList, newListDespesas) => {
    var somatotal = 0
    var somaTotalDespesa = 0
    newList.map(({listProducts}) =>{
      listProducts.map(item=>{
        somatotal += parseFloat(item.product.valor) * parseInt(item.qtd)
      })
    })
    newListDespesas.map(despesa=>{
      somaTotalDespesa += parseFloat(despesa.valor)
    })
    setSomaTotal(somatotal.toFixed(2))
    setTotalDespesa(somaTotalDespesa.toFixed(2))
  };
  
  return (
    <C.Container>
      <Header title="Faturamento" />
      <C.ContainerDate>
        <C.BtnAddDate onPress={handleBeforeMonth}>
          <Icon name="navigate-before" size={30} color={"#fff"} />
        </C.BtnAddDate>
        <C.DateTitle>{`${
          months[monthFilter.getMonth()]
        }/${monthFilter.getFullYear()}`}</C.DateTitle>
        <C.BtnAddDate onPress={handleNextMonth}>
          <Icon name="navigate-next" size={30} color={"#fff"} />
        </C.BtnAddDate>
      </C.ContainerDate>
      <C.ContainerValores>
        <C.ValoresText>
          Você teve um total de {pedidosFiltered.length}{" "}
          {pedidosFiltered.length > 1 ? "pedidos" : "pedido"} este mês{" "}
        </C.ValoresText>
        <C.ValoresText>Você Faturou: R${total}</C.ValoresText>
        <C.ValoresText>Você Gastou: R${totalDespesa}</C.ValoresText>
        <C.ValoresText>
          Seu faturamento liquido foi: R${(total - totalDespesa).toFixed(2)}
        </C.ValoresText>
      </C.ContainerValores>
    </C.Container>
  );
};
