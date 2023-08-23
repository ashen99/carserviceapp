import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  Button,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ServiceLocation = ({route, navigation}) => {
  const [searchHistory, setSearchHistory] = useState([]);

  const initialMarkers = [
    {
      id: 1,
      latitude: 6.903891,
      longitude: 79.867268,
      title: 'Service center 1',
      description: 'Car service center 1',
    },
    {
      id: 2,
      latitude: 6.935629,
      longitude: 79.925109,
      title: 'Service center 2',
      description: 'Car service center 2',
    },
    {
      id: 3,
      latitude: 6.913987,
      longitude: 79.950686,
      title: 'Service center 3',
      description: 'Car service center 3',
    },
  ];

  const [markers, setMarkers] = useState(initialMarkers);
  const [searchedMarker, setSearchedMarker] = useState('');
  const mapRef = useRef(null);

  //to search the service center locations of the map
  const handleSearch = () => {
    //to Find the marker that matches the search query
    const foundMarker = markers.find(marker =>
      marker.title.toLowerCase().includes(searchedMarker.toLowerCase()),
    );

    if (foundMarker) {
      // Animate the map to the found marker's position
      const region = {
        latitude: foundMarker.latitude,
        longitude: foundMarker.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      mapRef.current.animateToRegion(region, 1000);

      const history = {
        user: auth().currentUser.phoneNumber,
        text: searchedMarker,
      };

      // Update search history
      setSearchHistory([...searchHistory, history]);
    }
  };

  useEffect(() => {
    //to save the updated search history to AsyncStorage whenever it changes
    saveSearchHistory();
  }, [searchHistory]);

  const saveSearchHistory = async () => {
    try {
      await AsyncStorage.setItem(
        'searchHistory',
        JSON.stringify(searchHistory),
      );
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const handleRoute = (latitude, longitude) => {
    let data = {
      latitude: latitude,
      longitude: longitude,
    };
    navigation.navigate('ServiceLocation', {data: data});
  };

  return (
    <View style={{flex: 1}}>
      <TextInput
        placeholder="Search Service Center"
        placeholderTextColor="#000"
        onChangeText={text => setSearchedMarker(text)}
        style={{color: 'black', fontWeight: '600'}}
      />
      <Button title="Search" onPress={handleSearch} />
      <MapView
        style={{flex: 0.8}}
        initialRegion={{
          latitude: 6.927079,
          longitude: 79.861244,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        ref={mapRef}>
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            onPress={() => handleRoute(marker.latitude, marker.longitude)}
          />
        ))}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          title="Search History"
          onPress={() => navigation.navigate('searchHistory')}
        />
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    padding: 20,
    gap: 10,
  },
});

export default ServiceLocation;
