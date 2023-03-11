import React, { useContext, useState } from "react";
import { BtnSubmit } from "../../components/FormComponents/ButtonSubmit";
import { Input } from "../../components/FormComponents/Input";
import { Header } from "../../components/Header";
import { Products } from "../../context/authContext";
import uuid from "react-native-uuid";
import * as C from "./style";
import { Alert } from "react-native";
import Icon  from "react-native-vector-icons/FontAwesome";
export const AddProduto = () => {
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState();
  const { handleAddProduct, produtos, handleDelete } = useContext(Products);
  const [listProdutos,setListProdutos] = useState(produtos)
  const handleClick = () => {
    if (produto === "" || valor === "") {
      Alert.alert(
        "Existem campos vazios",
        "Por favor preencha todos os campos para prosseguir!"
      );
      return;
    }
    const data = {
      id: uuid.v4(),
      produto,
      valor,
    };
    setListProdutos([...listProdutos,data])
    handleAddProduct(data);
    setProduto("");
    setValor();
  };

  const handleProduto = (e) => {
    setProduto(e);
  };

  const handlePreco = (e) => {
    setValor(e);
  };

  const handleDeleteBtn = (id)=>{
    const newList = listProdutos.filter(produto=>{
      if(id !== produto.id){
        return produto
      }
    })
    setListProdutos(newList)
    handleDelete(id)
  }
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
      <C.ListContainer>
        <C.List
          data={listProdutos}
          renderItem={({ item }) => (
            <C.ItemContainer>
              <C.ItemText>Produto: {item.produto}</C.ItemText>
              <C.ItemText>
                Valor: R${parseFloat(item.valor).toFixed(2)}
              </C.ItemText>
              <C.BtnDelete onPress={() =>handleDeleteBtn(item.id.toString())}>
                <Icon name="trash-o" size={16} color="#e83f5b" />
              </C.BtnDelete>
            </C.ItemContainer>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </C.ListContainer>
    </C.Container>
  );
};
