import React from 'react';
import { View, Text, Button } from 'react-native';

const ContactScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Contact Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go to About" onPress={() => navigation.navigate('About')} />
    </View>
  );
};

export default ContactScreen;
