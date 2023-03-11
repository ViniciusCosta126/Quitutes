import { Header } from "../../components/Header";
import * as C from "./style";
import { Input } from "../../components/FormComponents/Input";
import { BtnSubmit } from "../../components/FormComponents/ButtonSubmit";
import { useContext, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { Despesas } from "../../context/despesasContext";
import Icon from "react-native-vector-icons/FontAwesome";
export const AddCustos = () => {
  const [date, setDate] = useState(new Date());
  const [titleCompra, setTitleCompra] = useState("");
  const [valorCompra, setValorCompra] = useState();
  const { handleAddDespesa, despesas, handleDelete } = useContext(Despesas);
  const [listDespesas, setListDespesas] = useState(despesas);
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
  const handleValor = (e) => {
    setValorCompra(e);
  };
  const handleTitle = (e) => {
    setTitleCompra(e);
  };

  const handleSubmit = () => {
    if (valorCompra === "" || titleCompra === "") {
      Alert.alert(
        "Existem campos vazios",
        "Por favor preencha todos os campos para prosseguir!"
      );
    }

    const data = {
      titulo: titleCompra,
      valor: valorCompra,
      id: uuid.v4(),
      data: date.toLocaleDateString(),
    };
    setListDespesas([...listDespesas, data]);
    handleAddDespesa(data);
    setDate(new Date());
    setTitleCompra("");
    setValorCompra();
  };

  const handleDeleteBtn = (id) => {
    const newList = listDespesas.filter((despesa) => {
      if (id !== despesa.id) {
        return despesa;
      }
    });
    setListDespesas(newList);
    handleDelete(id);
  };

  return (
    <C.Container>
      <Header title={"Adicionar Custo"} />
      <C.FormContainer>
        <Input
          placeholder="Digite o titulo da compra"
          autoCorrect={false}
          inputMode="text"
          onChangeItem={handleTitle}
          value={titleCompra}
        />
        <Input
          placeholder="Digite o valor da compra"
          autoCorrect={false}
          inputMode="decimal"
          keyboardType="decimal-pad"
          onChangeItem={handleValor}
          value={valorCompra}
        />
        <C.DateBtn onPress={showDatepicker}>
          <C.DateTitle>{`Data da compra: ${date.toLocaleDateString()}`}</C.DateTitle>
        </C.DateBtn>
        <BtnSubmit title={"Adicionar Custo"} onPress={handleSubmit} />
      </C.FormContainer>

      <C.ListContainer>
        <C.List
          data={listDespesas}
          renderItem={({ item }) => (
            <C.ItemContainer>
              <C.ItemText>Despesa: {item.titulo}</C.ItemText>
              <C.ItemText>
                Valor: R${parseFloat(item.valor).toFixed(2)}
              </C.ItemText>
              <C.BtnDelete onPress={() => handleDeleteBtn(item.id.toString())}>
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
