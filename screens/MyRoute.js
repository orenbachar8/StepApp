import React from 'react';
import { View, Text, Button , StyleSheet} from 'react-native';

export default function MyRoute({ navigation }) {
  return (
    <View style={styles.container}>
    <View style={styles.content}>
      <Text>MyRoute</Text>
    </View>
    <View style={styles.buttonContainer}>
      <Button title="HomeScreen" onPress={() => navigation.navigate('HomeScreen')} />
      <Button title="MyRoute" onPress={() => navigation.navigate('MyRoute')} />
      <Button title="Prizes" onPress={() => navigation.navigate('Prizes')} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
  </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
});




