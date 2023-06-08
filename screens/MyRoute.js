import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const userIcon = require('./user-icon.png');
const destinationIcon = require('./destination-icon.png');
const discountIcon = require('./discount-icon.png');
const selectedDiscountIcon = require('./selected-discount-icon.png');

export default function MyRoute({ navigation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [discountLocations, setDiscountLocations] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  useEffect(() => {
    // Set the user's location to Tel Aviv, Israel
    const userLocation = { latitude: 32.0853, longitude: 34.7818 };

    // Set the destination location to a different coordinate
    const destinationLocation = { latitude: 32.0858, longitude: 34.7811 };

    // Set the discount business locations
    const discountLocations = [
      { id: 1, name: 'Coffee Shop 1', coordinate: { latitude: 32.0851, longitude: 34.7814 } },
      { id: 2, name: 'Smoothie Bar', coordinate: { latitude: 32.0853, longitude: 34.7809 } },
      { id: 3, name: 'Restaurant', coordinate: { latitude: 32.0855, longitude: 34.7806 } },
    ];

    setUserLocation(userLocation);
    setDestinationLocation(destinationLocation);
    setDiscountLocations(discountLocations);
  }, []);

  const toggleDiscountSelection = (discountId) => {
    const isSelected = selectedDiscounts.includes(discountId);
    if (isSelected) {
      setSelectedDiscounts(selectedDiscounts.filter(id => id !== discountId));
    } else {
      setSelectedDiscounts([...selectedDiscounts, discountId]);
    }
  };

  const getInitialRegion = () => {
    if (userLocation && destinationLocation) {
      const latitudeDelta = Math.abs(userLocation.latitude - destinationLocation.latitude) + 0.05;
      const longitudeDelta = Math.abs(userLocation.longitude - destinationLocation.longitude) + 0.05;
      const centerLatitude = (userLocation.latitude + destinationLocation.latitude) / 2;
      const centerLongitude = (userLocation.longitude + destinationLocation.longitude) / 2;

      return {
        latitude: centerLatitude,
        longitude: centerLongitude,
        latitudeDelta,
        longitudeDelta,
      };
    }

    return null;
  };

  const initialRegion = getInitialRegion();

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {/* Render the user location marker */}
        {userLocation && (
          <Marker coordinate={userLocation}>
            <Image source={userIcon} style={styles.markerIcon} />
          </Marker>
        )}
        {/* Render the destination location marker */}
        {destinationLocation && (
          <Marker coordinate={destinationLocation}>
            <Image source={destinationIcon} style={styles.markerIcon} />
          </Marker>
        )}
        {/* Render the path between userLocation, selected discount locations, and destinationLocation */}
        {userLocation && destinationLocation && (
          <>
            <MapViewDirections
              origin={userLocation}
              destination={destinationLocation}
              waypoints={selectedDiscounts.map(discountId => {
                const discountLocation = discountLocations.find(location => location.id === discountId);
                return discountLocation.coordinate;
              })}
              strokeWidth={3}
              strokeColor="blue"
            />
            <Polyline
              coordinates={[
                userLocation,
                ...selectedDiscounts.map(discountId => {
                  const discountLocation = discountLocations.find(location => location.id === discountId);
                  return discountLocation.coordinate;
                }),
                destinationLocation,
              ]}
              strokeWidth={3}
              strokeColor="green"
            />
          </>
        )}
        {/* Render the discount locations markers */}
        {discountLocations.map(discountLocation => (
          <Marker
            key={discountLocation.id}
            coordinate={discountLocation.coordinate}
            onPress={() => toggleDiscountSelection(discountLocation.id)}
          >
            <Image source={selectedDiscounts.includes(discountLocation.id) ? selectedDiscountIcon : discountIcon} style={styles.markerIcon} />
          </Marker>
        ))}
      </MapView>
      <View style={styles.discountSection}>
        {/* Render the discounts section */}
        <Text style={styles.discountTitle}>Discounts on the Way:</Text>
        {discountLocations.map(discountLocation => (
          <Text
            key={discountLocation.id}
            style={selectedDiscounts.includes(discountLocation.id) ? styles.selectedDiscountText : styles.discountText}
          >
            {discountLocation.name}
          </Text>
        ))}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '70%',
  },
  markerIcon: {
    width: 32,
    height: 32,
  },
  discountSection: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    width: '100%',
  },
  discountTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  discountText: {
    fontSize: 16,
    marginBottom: 4,
  },
  selectedDiscountText: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
});

