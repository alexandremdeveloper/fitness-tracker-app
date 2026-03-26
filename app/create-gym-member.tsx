import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function CreateGymMember() {

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pesoInicial, setPesoInicial] = useState("");
  const [pesoAtual, setPesoAtual] = useState("");

  const createGymMember = async () => {
    try {
      const response = await fetch("http://192.168.0.20:8080/alunos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          cpf,
          email,
          telefone,
          pesoInicial: Number(pesoInicial),
          pesoAtual: Number(pesoAtual),
          treinosPorSemana: 5,
          anamnesePreenchida: true
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar");
      }

      Alert.alert("Sucesso", "Aluno cadastrado!");

    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível cadastrar");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Cadastro de Aluno</Text>

      <TextInput placeholder="Nome" onChangeText={setNome} />
      <TextInput placeholder="CPF" onChangeText={setCpf} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Telefone" onChangeText={setTelefone} />
      <TextInput placeholder="Peso Inicial" onChangeText={setPesoInicial} keyboardType="numeric" />
      <TextInput placeholder="Peso Atual" onChangeText={setPesoAtual} keyboardType="numeric" />

      <Button title="Cadastrar" onPress={createGymMember} />
    </View>
  );
}