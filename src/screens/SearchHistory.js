import {StyleSheet, Text, View, FlatList, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const SearchHistory = ({route, navigation}) => {
  const [searchHistory, setSearchHistory] = useState([]);
  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      const user = auth().currentUser.phoneNumber;
      if (history !== null) {
        //tp parse the stored search history, which should be an array of searcj history objects
        const parsedHistory = JSON.parse(history);

        if (Array.isArray(parsedHistory)) {
          // Filter the history based on the current users phhone number
          const filteredHistory = parsedHistory.filter(
            item => item.user === user,
          );

          // Extract only the text from the filtered history
          const textOnlyHistory = filteredHistory.map(item => item.text);
          console.log(textOnlyHistory, 'text only');
          // Update the state with the filtered history
          setSearchHistory(textOnlyHistory);
        }

        console.log(searchHistory, 'laod history');
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SearchHistory</Text>
      <FlatList
        style={styles.flatList}
        data={searchHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.items}>{item}</Text>
          </View>
        )}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SearchHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: 'black',
    fontWeight: '700',
    marginBottom: 15,
  },
  flatList: {
    gap: 10,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#F0FFFF',
    borderRadius: 3,
    marginBottom: 10,
  },
  items: {
    fontSize: 16,
    color: 'black',
  },
});
