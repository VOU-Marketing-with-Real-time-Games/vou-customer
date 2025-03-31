import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Text,
} from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Icon, MD3Colors } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import tw from "../../lib/tailwind";
import LocationNear from "../../components/location/location-near";
import { ILocation } from "../../types/location";
import { IBranch } from "../../types/branch";
import branchApi from "../../api/branch.api";
import { haversine } from "../../utils/distance";

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
  const [branches, setBranches] = React.useState<IBranch[] | null>(null);

  const getAllCampaigns = useQuery({
    queryKey: ["list-branch"],
    queryFn: async () => {
      const response: IBranch[] = await branchApi.getAll();
      console.log(response);
      setBranches(response);
      return response;
    },
  });

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!branches) return;
    const index = Math.min(Math.round(event.nativeEvent.contentOffset.x / (width * 0.8)), branches.length - 1);
    const location = branches[index];
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
      x: index * width * 0.8,
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
        console.log(latitude, longitude);
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
      {getAllCampaigns.isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
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
            {branches &&
              branches.map((location, index) => (
                <Marker
                  key={location.id}
                  title={location.name}
                  description="This is a description"
                  coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                  onPress={() => onMarkerPress(location, index)}
                >
                  <Icon
                    source="map-marker"
                    color={MD3Colors.error50}
                    size={selectedLocation === location.id ? 42 : 30}
                  />
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
                {branches &&
                  branches.map((location, index) => (
                    <View key={`a-${index + 1}`}>
                      <LocationNear
                        location={location}
                        distance={
                          haversine(location.latitude, location.longitude, position.latitude, position.longitude) || 10
                        }
                      />
                    </View>
                  ))}
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

export default LocationScreen;
