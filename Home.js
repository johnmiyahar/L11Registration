import React, { useState, useEffect } from 'react';
import { StatusBar, Button, FlatList, StyleSheet, Text, View } from 'react-native';

const Home = ({ navigation }) => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        fetch("https://1aaa2bc96c744a9eb46a04d14c0af320.api.mockbin.io/")
            .then((response) => response.json())
            .then((myJson) => {
                setMyData(myJson);
            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
            });
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.listContainer}>
                <Text style={styles.itemText}>Username: <Text style={styles.boldText}>{item.username}</Text></Text>
                <Text style={styles.itemText}>Email: <Text style={styles.boldText}>{item.email}</Text></Text>
                <Text style={styles.itemText}>Phone: <Text style={styles.boldText}>{item.phone}</Text></Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#87CEEB" />
            <Text style={styles.title}>Registered Users</Text>
            <Button
                title="Add User"
                onPress={() => navigation.navigate("Add", { datastr: JSON.stringify(myData) })}
                color="#4682B4"
            />
            <FlatList
                data={myData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#E0F7FA" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#005B96" },
    list: { marginTop: 10 },
    listContainer: { borderWidth: 1, borderRadius: 10, padding: 15, backgroundColor: "#FFFFFF", borderColor: "#87CEEB", marginBottom: 10 },
    itemText: { fontSize: 16, marginBottom: 5, color: "#333" },
    boldText: { fontWeight: "bold", color: "#005B96" },
});

export default Home;
