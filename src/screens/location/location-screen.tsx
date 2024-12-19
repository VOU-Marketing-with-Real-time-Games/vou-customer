import { View, StyleSheet, Alert, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Icon, MD3Colors } from "react-native-paper";
import tw from "../../lib/tailwind";
import LocationNear from "../../components/location/location-near";
import { ILocation } from "../../types/location";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const locations: ILocation[] = [
  { id: 1, name: "Store 1", latitude: 37.4219983, longitude: -122.084 },
  { id: 2, name: "Store 2", latitude: 37.4219983, longitude: -122.094 },
  { id: 3, name: "Store 3", latitude: 37.4219983, longitude: -122.085 },
  { id: 4, name: "Store 4", latitude: 37.4219983, longitude: -122.075 },
  { id: 5, name: "Store 5", latitude: 37.4219983, longitude: -122.098 },
];

const { width } = Dimensions.get("window");

const LocationScreen = () => {
  const mapRef = React.useRef<MapView>(null);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [selectedLocation, setSelectedLocation] = React.useState<number | null>(null);
  const [position, setPosition] = React.useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.min(Math.round(event.nativeEvent.contentOffset.x / width), locations.length - 1);
    const location = locations[index];
    setSelectedLocation(location.id);

    // Move map to selected marker
    mapRef.current?.animateToRegion(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      500,
    );
  };

  const onMarkerPress = (location: ILocation, index: number) => {
    // Scroll to corresponding item
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });

    // Highlight marker
    setSelectedLocation(location.id);
  };

  React.useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      if (coords) {
        const { latitude, longitude } = coords;
        setPosition({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    };
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={position}
        showsUserLocation
        showsMyLocationButton
        followsUserLocation
        showsCompass
        scrollEnabled
        zoomEnabled
        pitchEnabled
        rotateEnabled
      >
        {locations.map((location, index) => (
          <Marker
            key={location.id}
            title={location.name}
            description="This is a description"
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            onPress={() => onMarkerPress(location, index)}
          >
            <Icon source="map-marker" color={MD3Colors.error50} size={selectedLocation === location.id ? 42 : 30} />
          </Marker>
        ))}
      </MapView>
      {/* scroll view location */}
      <View style={tw`absolute bottom-3 left-0 z-10`}>
        <ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
        >
          <View style={tw`flex-row gap-5 px-3`}>
            {locations.map((location, index) => (
              <View key={`a-${index + 1}`}>
                <LocationNear name={location.name} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default LocationScreen;
