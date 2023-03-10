import { Header } from "../../components/Header";
import * as C from "./style";
import { Input } from "../../components/FormComponents/Input";
import { BtnSubmit } from "../../components/FormComponents/ButtonSubmit";
import { useContext, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { Despesas } from "../../context/despesasContext";
export const AddCustos = () => {
  const [date, setDate] = useState(new Date());
  const [titleCompra, setTitleCompra] = useState("");
  const [valorCompra, setValorCompra] = useState(0);
  const {handleAddDespesa} = useContext(Despesas);
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
      valor :valorCompra,
      id:uuid.v4(),
      data: date.toLocaleDateString()
    }
    handleAddDespesa(data)
    setDate(new Date())
    setTitleCompra("")
    setValorCompra("")
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
    </C.Container>
  );
};
