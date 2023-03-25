import React, { useContext, useState } from "react";
import { Header } from "../../components/Header";
import * as C from "./style";
import { Products } from "../../context/authContext";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Input } from "../../components/FormComponents/Input";
import { BtnSubmit } from "../../components/FormComponents/ButtonSubmit";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { Orders } from "../../context/pedidosContext";
import { Switch } from "react-native";
import { somaTotal } from "../../utils";

export const AddPedido = () => {
  const { produtos } = useContext(Products);
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState(produtos);
  const [showFlatList, setShowFlatList] = useState(false);
  const [date, setDate] = useState(new Date());
  const [listProducts, setListProducts] = useState([]);
  const [quemPediu, setQuemPediu] = useState("");
  const [telefone, setTelefone] = useState();
  const [total, setTotal] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const [entrega, setEntrega] = useState();
  const { handleAddOrder } = useContext(Orders);
  const filterOptions = () => {
    if (searchTerm === "") {
      return options;
    }
    return options.filter((option) =>
      option.produto.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => showMode("date");

  const addProductList = (product) => {
    var newList = listProducts;
    const indice = listProducts.findIndex((objeto) => {
      return objeto.product.id === product.id;
    });
    if (indice !== -1) {
      newList[indice].qtd += 1;
    } else {
      const item = {
        product,
        qtd: 1,
      };
      newList.push(item);
    }
    setListProducts(newList);
    setTotal(somaTotal(listProducts,entrega));
  };

  const handleQuemPediu = (e) => setQuemPediu(e);

  const handleEntrega = (e) => {
    setEntrega(e);
    setTotal(somaTotal(listProducts,entrega))
  }

  const handleTelefone = (e) => setTelefone(e);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleSubmit = () => {
    if (quemPediu === "" || date === "" || listProducts.length === 0 || entrega === "") {
      Alert.alert(
        "Existem campos vazios",
        "Por favor preencha todos os campos para prosseguir!"
      );
      return;
    }
    const data = {
      id: uuid.v4(),
      listProducts,
      data: date.toLocaleDateString(),
      cliente: quemPediu,
      telefone,
      valorEntrega: entrega ? entrega : null,
      is_done: false,
      is_pay: false,
      is_delivery: isEnabled,
    };
    handleAddOrder(data);
    setDate(new Date());
    setTelefone();
    setQuemPediu("");
    setIsEnabled(false);
    setListProducts([]);
    setEntrega();
    setTotal(0);
  };

  return (
    <C.Container>
      <Header title="Adicionar Pedido" />
      <C.FormContainer>
        <C.SearchBar
          placeholder="Digite aqui para procura Produto"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onFocus={() => setShowFlatList(!showFlatList)}
          onSelectionChange={() => setShowFlatList(!showFlatList)}
          autoCorrect={false}
          placeholderTextColor="#fff"
        />
        {showFlatList ? (
          <C.List
            data={filterOptions()}
            renderItem={({ item }) => (
              <C.ItemBtn onPress={() => addProductList(item)}>
                <C.ItemText>{item.produto}</C.ItemText>
              </C.ItemBtn>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : null}
        <C.DateBtn onPress={showDatepicker}>
          <C.DateTitle>{`Data de entrega: ${date.toLocaleDateString()}`}</C.DateTitle>
        </C.DateBtn>
        <Input
          placeholder="Pedido por:"
          autoCorrect={false}
          value={quemPediu}
          onChangeItem={handleQuemPediu}
        />
        <Input
          placeholder="Telefone: "
          autoCorrect={false}
          value={telefone}
          onChangeItem={handleTelefone}
          keyboardType="number-pad"
          inputMode="numeric"
        />
        <C.SwitchContainer>
          <C.TextSwitch>Entrega?</C.TextSwitch>
          <Switch
            trackColor={{ false: "#767577", true: "#f1f1f1" }}
            thumbColor={isEnabled ? "#D06926" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </C.SwitchContainer>
        {isEnabled ? (
          <Input
            placeholder="Valor entrega: "
            autoCorrect={false}
            value={entrega}
            onChangeItem={handleEntrega}
            keyboardType="number-pad"
            inputMode="numeric"
          />
        ) : null}
        {listProducts.length > 0 ? (
          <C.ListProducts
            data={listProducts}
            renderItem={({ item }) => (
              <C.ProductItemBtn>
                <C.ProductItemText>{item.product.produto}</C.ProductItemText>
                <C.ProductItemQtd>Quantidade: {item.qtd}</C.ProductItemQtd>
              </C.ProductItemBtn>
            )}
            keyExtractor={(item) => item.product.id.toString()}
          />
        ) : null}
        <C.TextTotal>Total do Pedido: R${total.toFixed(2)}</C.TextTotal>
        <BtnSubmit onPress={handleSubmit} title="Adicionar Produto" />
      </C.FormContainer>
    </C.Container>
  );
};
