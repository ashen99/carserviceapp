import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function PhoneNumber({route, navigation}) {
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  //to check whether the user is still logged in
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('User');
      jsonValue != null
        ? navigation.navigate('home', {user: JSON.parse(jsonValue)})
        : null;
    } catch (e) {
      console.log(e);
    }
  };

  //to login a user to the firebase database with a phonenumber
  async function signIn(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      // setConfirm(confirmation);
      navigation.navigate('VerifyCode', {confirmation});
    } catch (error) {
      alert(error);
    }
  }
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Enter Phone Number</Text>
      <TextInput
        autoFocus
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <Button
        title="Phone Number Sign In"
        onPress={() => signIn(phoneNumber)}
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
    color: 'black',
    fontSize: 25,
  },
});
