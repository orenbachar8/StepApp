import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to About" onPress={() => navigation.navigate('About')} />
      <Button title="Go to Contact" onPress={() => navigation.navigate('Contact')} />
    </View>
  );
};

export default HomeScreen;
