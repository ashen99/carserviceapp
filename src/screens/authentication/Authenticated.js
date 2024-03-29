import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Authenticated({route, navigation}) {
  const singout = async () => {
    auth().signOut();
    await AsyncStorage.removeItem('User');
    navigation.navigate('phoneNumber');
  };
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>You're Logged in</Text>
      <Text style={styles.phoneNumber}>{auth().currentUser.phoneNumber}</Text>
      <View style={{marginTop: 30}}>
        <Button title="Signout" onPress={() => singout()} />
      </View>
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
  },
  text: {
    fontSize: 25,
  },
  phoneNumber: {
    fontSize: 21,
    marginTop: 20,
  },
});
