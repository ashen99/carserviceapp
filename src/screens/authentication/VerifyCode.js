import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OTP({route, navigation}) {
  const {confirmation} = route.params;
  const [code, setCode] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      handleAsyncStroage(user);
    }
  }, [user]);

  //to store user in local storage
  const handleAsyncStroage = async user => {
    await AsyncStorage.setItem('User', JSON.stringify(user));

    navigation.navigate('home', {user: user});
  };

  //to confirm the OTP with the phone number
  async function confirmVerificationCode(code) {
    try {
      await confirmation.confirm(code);
      // setConfirm(null);
    } catch (error) {
      alert('Invalid code');
    }
  }
  auth().onAuthStateChanged(user => {
    if (user) setUser(user);
  });
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Enter OTP</Text>
      <TextInput
        autoFocus
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        title="Confirm OTP"
        onPress={() => confirmVerificationCode(code)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: 'lightblue',
    width: 300,
    marginVertical: 30,
    fontSize: 25,
    padding: 10,
    borderRadius: 8,
    color: 'black',
  },
  text: {
    fontSize: 25,
    color: 'black',
  },
});
