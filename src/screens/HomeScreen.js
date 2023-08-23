import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const carServiceCentres = [
  {
    name: 'Service Centre 1',
    address: '123 Main St, City A',
    coordinates: {latitude: 6.903891, longitude: 79.867268},
  },
  {
    name: 'Service Centre 2',
    address: '456 Elm St, City B',
    coordinates: {latitude: 6.935629, longitude: 79.925109},
  },
  {
    name: 'Service Centre 3',
    address: '234 Bck St, City C',
    coordinates: {latitude: 6.913987, longitude: 79.950686},
  },
];

const HomeScreen = ({route, navigation}) => {
  //to logout the user from the system
  const singout = async () => {
    auth().signOut();
    await AsyncStorage.removeItem('User');
    navigation.navigate('phoneNumber');
  };

  //to go to the navigation screen
  const handleMapData = data => {
    navigation.navigate('ServiceLocation', {data: data});
  };

  const handleMapScreen = data => {
    navigation.navigate('locationHome');
  };

  const renderItem = ({item}) => (
    <View style={styles.itemList}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          handleMapData(item.coordinates);
        }}>
        <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>
          Name: {item.name}
        </Text>
        <Text>Address: {item.address}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text
          style={{
            color: 'black',
            fontSize: 30,
            fontWeight: 'bold',
            paddingBottom: 20,
          }}>
          Car Service Centers
        </Text>
        <View style={styles.listContainer}>
          <FlatList
            style={{width: '100%'}}
            data={carServiceCentres}
            renderItem={renderItem}
            keyExtractor={item => item.name}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Search Map" onPress={handleMapScreen} />
        <Button color="#ff2d00" title="Signout" onPress={() => singout()} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 0.7,
    padding: 20,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    gap: 10,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  itemList: {
    marginVertical: 10,
    width: '100%',
  },
  item: {
    backgroundColor: '#0782F9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});
