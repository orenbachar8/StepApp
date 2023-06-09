import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const userIcon = require('./user-icon.png');
const destinationIcon = require('./destination-icon.png');
const discountIcon1 = require('./Tamara.png');
const discountIcon2 = require('./Sumsum.png');
const discountIcon3 = require('./carrefour.png');
const selectedDiscountIcon = require('./selected-discount-icon.png');

const userLocation = { latitude: 32.081702, longitude: 34.773038 };
const destinationLocation = { latitude: 32.093891, longitude: 34.776715 };
const discountLocations = [
  { id: 1, name: 'Tamara Smoothies', coordinate: { latitude: 32.084712, longitude: 34.774348 } },
  { id: 2, name: 'Sumsum Salads', coordinate: { latitude: 32.085946, longitude: 34.774644 } },
  { id: 3, name: 'Carrefour', coordinate: { latitude: 32.091100, longitude: 34.776011 } },
];

export default function MyRoute({ navigation }) {
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  const toggleDiscountSelection = (discountId) => {
    setSelectedDiscounts((prevSelectedDiscounts) => {
      if (prevSelectedDiscounts.includes(discountId)) {
        return prevSelectedDiscounts.filter((id) => id !== discountId);
      } else {
        return [...prevSelectedDiscounts, discountId];
      }
    });
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

  const getDiscountLogoStyle = (discountId) => {
    return selectedDiscounts.includes(discountId)
      ? styles.selectedDiscountLogo
      : styles.discountLogo;
  };

  const getDiscountTextStyle = (discountId) => {
    return selectedDiscounts.includes(discountId)
      ? styles.selectedDiscountText
      : styles.discountText;
  };

  const getDiscountCoordinates = () => {
    if (selectedDiscounts.length > 0) {
      return selectedDiscounts.map((discountId) => {
        const discountLocation = discountLocations.find((location) => location.id === discountId);
        return discountLocation.coordinate;
      });
    } else {
      return [];
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={getInitialRegion()}>
        {/* Render the user location marker */}
        <Marker coordinate={userLocation}>
          <Image source={userIcon} style={styles.markerIcon} />
        </Marker>

        {/* Render the destination location marker */}
        <Marker coordinate={destinationLocation}>
          <Image source={destinationIcon} style={styles.markerIcon} />
        </Marker>

        {/* Render the path between userLocation, selected discount locations, and destinationLocation */}
        <Polyline
          coordinates={[
            userLocation,
            ...getDiscountCoordinates(),
            destinationLocation,
          ]}
          strokeWidth={3}
          strokeColor="green"
        />

        {/* Render the discount locations markers */}
        {discountLocations.map((discountLocation) => (
          <Marker
            key={discountLocation.id}
            coordinate={discountLocation.coordinate}
            onPress={() => toggleDiscountSelection(discountLocation.id)}
          >
            <View style={styles.discountMarkerContainer}>
              <Image source={getDiscountIcon(discountLocation.id)} style={styles.discountIcon} />
              <View
                style={[
                  styles.discountIndicator,
                  selectedDiscounts.includes(discountLocation.id) && styles.selectedDiscountIndicator,
                ]}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      <View style={styles.discountSection}>
        {/* Render the discounts section */}
        <Text style={styles.discountTitle}>Discounts on the Way:</Text>
        {discountLocations.map((discountLocation) => (
          <View key={discountLocation.id} style={styles.discountItemContainer}>
            <Image source={getDiscountIcon(discountLocation.id)} style={getDiscountLogoStyle(discountLocation.id)} />
            <Text style={getDiscountTextStyle(discountLocation.id)}>{discountLocation.name}</Text>
          </View>
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
  discountItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  discountLogo: {
    width: 32,
    height: 32,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'pink',
  },
  selectedDiscountLogo: {
    width: 32,
    height: 32,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'green',
    backgroundColor: 'pink',
  },
  discountText: {
    fontSize: 16,
  },
  selectedDiscountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  discountMarkerContainer: {
    alignItems: 'center',
  },
  discountIcon: {
    width: 32,
    height: 32,
  },
  discountIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginTop: 2,
  },
  selectedDiscountIndicator: {
    backgroundColor: 'green',
  },
});

function getDiscountIcon(discountId) {
  switch (discountId) {
    case 1:
      return discountIcon1;
    case 2:
      return discountIcon2;
    case 3:
      return discountIcon3;
    default:
      return discountIcon1;
  }
}
