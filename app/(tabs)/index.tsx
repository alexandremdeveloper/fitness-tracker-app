import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  console.log("Iniciando app");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      console.log("effect:", token);
      if (token) {
        router.replace("/dashboard");
      }
    };
    checkToken();
  }, []);

  async function handleLogin() {
    console.log("Tentando logar com:", { email, senha });
    setLoading(true);
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
      setLoading(false);
      if ( response.ok && data.token) {
        await SecureStore.setItemAsync("token", data.token);
        router.replace("/dashboard")
      } else {
        alert("Erro no login");
      }
    } catch (error) {
      setLoading(false);
      alert("Erro de conexão");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness App 💪</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholderTextColor="#999"
      />

      <Button title={loading ? "Entrando..." : "Entrar" } onPress={handleLogin} disabled={loading} />
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