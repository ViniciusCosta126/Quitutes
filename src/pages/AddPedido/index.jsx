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


export const AddPedido = () => {
  const { produtos } = useContext(Products);
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState(produtos);
  const [showFlatList, setShowFlatList] = useState(false);
  const [date, setDate] = useState(new Date());
  const [listProducts, setListProducts] = useState([]);
  const [quemPediu, setQuemPediu] = useState("");
  const [telefone, setTelefone] = useState();
  const { handleAddOrder,pedidos } = useContext(Orders);
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

  const showDatepicker = () => {
    showMode("date");
  };

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
  };

  const handleQuemPediu = (e) => {
    setQuemPediu(e);
  };

  const handleTelefone = (e) => {
    setTelefone(e);
  };

  const handleSubmit = () => {
    if (
      telefone === "" ||
      quemPediu === "" ||
      date === "" ||
      listProducts.length === 0
    ) {
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
    };
    handleAddOrder(data)
    console.log(pedidos)
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
          autoCorrect={false}
          onPressOut={() => setShowFlatList(!showFlatList)}
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
          autoCorrec={false}
          value={quemPediu}
          onChangeItem={handleQuemPediu}
        />
        <Input
          placeholder="Telefone: "
          autoCorrec={false}
          value={telefone}
          onChangeItem={handleTelefone}
          keyboardType="number-pad"
          inputMode="numeric"
        />

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

        <BtnSubmit onPress={handleSubmit} title="Adicionar Produto" />
      </C.FormContainer>
    </C.Container>
  );
};
