import React, { useEffect, useState } from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { FAB, Card, Title, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";

const API_URL = "http:// 192.168.0.11:3000";

export default function HomeScreen() {
  const [locais, setLocais] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    const res = await fetch(`${API_URL}/lixo`);
    const data = await res.json();
    setLocais(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={locais}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.nomeLocal}</Title>
              <Paragraph>{item.descricao}</Paragraph>
            </Card.Content>
            {item.foto && (
              <Card.Cover
                source={{ uri: `${API_URL}/${item.foto}` }}
                style={styles.image}
              />
            )}
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("Adicionar Local de Lixo")}
      />
      <FAB
        icon="map"
        style={styles.mapButton}
        onPress={() => navigation.navigate("Mapa")}
      />
    </View>
  );
}
