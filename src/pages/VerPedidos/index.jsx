import React, { useCallback, useContext, useState } from "react";
import * as C from "./style";
import { Header } from "../../components/Header";
import { Orders } from "../../context/pedidosContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { beforeMonth, filterData, nextMonth, somaTotal } from "../../utils";

export const VerPedidos = () => {
  const { pedidos, handleIsDone, handleDelete, handleIsPay } =
    useContext(Orders);
  const [pedidosFiltered, setPedidosFiltered] = useState(pedidos);
  const [title, setTitle] = useState("Todos os Pedidos");
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [dateAtual, setDateAtual] = useState(new Date());
  const [monthFilter, setMonthFilter] = useState(dateAtual);
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

  const handleFilterFeitos = () => {
    const newList = pedidos.filter((pedido) => {
      if (pedido.is_done) {
        return pedido;
      }
    });
    setTitle("Pedidos Concluidos");
    setPedidosFiltered(newList);
  };

  const handleFilterFazer = () => {
    const newList = pedidos.filter((pedido) => {
      if (pedido.is_done === false) {
        return pedido;
      }
    });
    setTitle("Pedidos a Fazer");
    setPedidosFiltered(newList);
  };
  
  const handleTodos = () => {
    setPedidosFiltered(pedidos);
    setTitle("Todos os pedidos");
  };

  const handleCheck = (id) => {
    const newList = pedidosFiltered.map((pedido) => {
      if (id === pedido.id) {
        return {
          ...pedido,
          is_done: !pedido.is_done,
        };
      }
      return pedido;
    });
    setPedidosFiltered(newList);
    handleIsDone(id);
  };

  const ordenarPorData = () => {
    const newList = pedidosFiltered.sort((a, b) => {
      const newDateA = a.data;
      const newDateB = b.data;
      let dateFormatA = newDateA.split("/");
      let dateFormatB = newDateB.split("/");
      dateFormatA = `${dateFormatA[2]}-${dateFormatA[1]}-${dateFormatA[0]}`;
      dateFormatB = `${dateFormatB[2]}-${dateFormatB[1]}-${dateFormatB[0]}`;
      return new Date(dateFormatA) - new Date(dateFormatB);
    });
    setPedidosFiltered(newList);
    forceUpdate();
  };

  const handleDeleteItem = (id) => {
    const newList = pedidosFiltered.filter((pedido) => {
      if (id !== pedido.id) {
        return pedido;
      }
    });
    setPedidosFiltered(newList);
    handleDelete(id);
  };

  const handlePayItem = (id) => {
    const newList = pedidosFiltered.map((pedido) => {
      if (id === pedido.id) {
        return {
          ...pedido,
          is_pay: !pedido.is_pay,
        };
      }
      return pedido;
    });
    setPedidosFiltered(newList);
    handleIsPay(id);
  };

  const handleNextMonth = () => {
    setMonthFilter(nextMonth(monthFilter));
    filterPedidos()
  };

  const handleBeforeMonth =()=>{
    setMonthFilter(beforeMonth(monthFilter))
    filterPedidos()
  }

  const filterPedidos = ()=>{
    setPedidosFiltered(filterData(pedidos,monthFilter))
  }

  return (
    <C.Container>
      <Header title="Pedidos Realizados" />
      <C.FilterContainer>
        <C.BtnFilter onPress={ordenarPorData}>
          <C.BtnFilterText>Data de entrega</C.BtnFilterText>
        </C.BtnFilter>
        <C.BtnFilter>
          <C.BtnFilterText onPress={handleTodos}>
            Todos os Pedidos
          </C.BtnFilterText>
        </C.BtnFilter>
        <C.BtnFilter>
          <C.BtnFilterText onPress={handleFilterFazer}>
            Pedidos a fazer
          </C.BtnFilterText>
        </C.BtnFilter>
        <C.BtnFilter>
          <C.BtnFilterText onPress={handleFilterFeitos}>
            Pedidos Concluidos
          </C.BtnFilterText>
        </C.BtnFilter>
      </C.FilterContainer>

      <C.PedidosContainer>
        <C.ContainerDate>
          <C.BtnAddDate onPress={handleBeforeMonth}>
            <Icon name="chevron-left" size={20} color={"#fff"} />
          </C.BtnAddDate>
          <C.DateTitle>{`${months[monthFilter.getMonth()]}/${monthFilter.getFullYear()}`}</C.DateTitle>
          <C.BtnAddDate onPress={handleNextMonth}>
            <Icon name="chevron-right" size={20} color={"#fff"} />
          </C.BtnAddDate>
        </C.ContainerDate>
        <C.TitlePedido>{title}</C.TitlePedido>
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
                    <C.ItemTitle>{item.product.produto}</C.ItemTitle>
                    <C.ItemText>
                      | R${parseFloat(item.product.valor).toFixed(2)}
                    </C.ItemText>
                    <C.ItemText>| Qtd: {item.qtd}</C.ItemText>
                  </C.ItemContainer>
                )}
                keyExtractor={(item) => item.product.id.toString()}
              />
              <C.PedidoEntrega>
                {item.is_delivery ? `Entrega | Valor da Entrega: R$${parseFloat(item.valorEntrega).toFixed(2)}` : "Retirada"}
              </C.PedidoEntrega>
              <C.PedidoTitle>
                Total: R${somaTotal(item.listProducts,item.valorEntrega)} | Status:{" "}
                {item.is_pay ? "Pago" : "Em Aberto"}
              </C.PedidoTitle>
              <C.BtnCheck
                onPress={() => handleCheck(item.id.toString())}
                feito={item.is_done}
              >
                <Icon
                  name="check"
                  size={16}
                  color={item.is_done ? "#fff" : "#000"}
                />
              </C.BtnCheck>
              <C.BtnDelete
                onPress={() => {
                  handleDeleteItem(item.id.toString());
                }}
              >
                <Icon name="trash-o" size={16} color="#e83f5b" />
              </C.BtnDelete>
              <C.BtnPay onPress={() => handlePayItem(item.id.toString())}>
                <Icon name="dollar" size={16} color="#12a454" />
              </C.BtnPay>
            </C.PedidoView>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </C.PedidosContainer>
    </C.Container>
  );
};
