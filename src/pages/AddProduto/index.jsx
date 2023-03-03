import React, { useContext, useState } from "react";
import { BtnSubmit } from "../../components/FormComponents/ButtonSubmit";
import { Input } from "../../components/FormComponents/Input";
import { Header } from "../../components/Header";
import { Products } from "../../context/authContext";
import uuid from 'react-native-uuid';
import * as C from "./style";
import { Alert } from "react-native";
export const AddProduto = () => {
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState();
  const { handleAddProduct,produtos} = useContext(Products);

  const handleClick = () => {
    if(produto ==="" || valor === ""){
      Alert.alert("Existem campos vazios", "Por favor preencha todos os campos para prosseguir!")
      return
    }
    const data = {
      id: uuid.v4(),
      produto,
      valor,
    };
    handleAddProduct(data)
    console.log(produtos)
  };

  const handleProduto = (e) => {
    setProduto(e);
  };

  const handlePreco = (e) => {
    setValor(e);
  };

  return (
    <C.Container>
      <Header title="Adicionar produtos" />
      <C.FormContainer>
        <Input
          placeholder="Digite o nome do produto"
          autoCorrect={false}
          inputMode="text"
          onChangeItem={handleProduto}
          value={produto}
        />
        <Input
          placeholder="Digite o valor do produto"
          autoCorrect={false}
          inputMode="decimal"
          keyboardType="decimal-pad"
          onChangeItem={handlePreco}
          value={valor}
        />
        <BtnSubmit title={"Adicionar produto"} onPress={handleClick} />
      </C.FormContainer>
    </C.Container>
  );
};
