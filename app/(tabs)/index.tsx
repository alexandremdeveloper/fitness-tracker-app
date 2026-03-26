import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    console.log("👉 Iniciando login");

    try {
      const response = await fetch(
        "https://fitness-tracker-api-1-ofmm.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: email, password: senha }),
        }
      );
      
      const data = await response.json();

      console.log("STATUS:", response.status);
      console.log("DATA:", data);

      if ( response.ok && data.token) {
        await SecureStore.setItemAsync("token", data.token);
        router.replace('/(tabs)')
      } else {
        alert("Erro no login");
      }
    } catch (error) {
      alert("Erro de conexão");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness App 💪</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        onChangeText={setSenha}
        placeholderTextColor="#999"
      />

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff", // garante fundo branco
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color: "#000", // 🔥 ISSO resolve
    borderColor: "#ccc",
  },
});