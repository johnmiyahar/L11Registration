import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput, StyleSheet, Alert } from 'react-native';

const Add = ({ navigation, route }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = () => {
        if (!username || !email || !phone) {
            Alert.alert("Error", "All fields are required!");
            return;
        }

        let myData = JSON.parse(route.params.datastr);
        const newUser = { username, email, phone };
        myData.push(newUser);

        fetch("https://1aaa2bc96c744a9eb46a04d14c0af320.api.mockbin.io/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(myData),
        })
            .then((response) => response.json())
            .then(() => {
                navigation.navigate("Home");
            })
            .catch((error) => {
                Alert.alert("Error", "Failed to submit data!");
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#87CEEB" />
            <Text style={styles.label}>Username:</Text>
            <TextInput style={styles.input} onChangeText={setUsername} value={username} />
            <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input} onChangeText={setEmail} value={email} />
            <Text style={styles.label}>Phone:</Text>
            <TextInput style={styles.input} onChangeText={setPhone} value={phone} />
            <Button title="Submit" onPress={handleSubmit} color="#4682B4" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#E0F7FA" },
    label: { fontSize: 18, marginVertical: 8, color: "#005B96", fontWeight: "bold" },
    input: { borderWidth: 1, borderRadius: 8, padding: 10, borderColor: "#87CEEB", backgroundColor: "#FFFFFF", marginBottom: 12 },
});

export default Add;
