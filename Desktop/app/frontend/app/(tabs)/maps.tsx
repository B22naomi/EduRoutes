import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuth } from '@/hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { mockRoutes, mockBuses } from '@/data/mockData';
import { Filter, Bus as BusIcon, Navigation, List, MapPin } from 'lucide-react-native';
import BusListItem from '@/components/maps/BusListItem';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolate } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import BusDetailSheet from '@/components/maps/BusDetailSheet';
import { Platform } from 'react-native';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function MapsScreen() {
  const [selectedBus, setSelectedBus] = useState(null);
  const [showList, setShowList] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState(1);
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const { user } = useAuth();
  
  const backgroundColor = useThemeColor({ light: '#F8FAFC', dark: '#0F172A' });
  const cardBgColor = useThemeColor({ light: '#FFFFFF', dark: '#1E293B' });
  const textColor = useThemeColor({ light: '#1E293B', dark: '#F8FAFC' });
  const secondaryTextColor = useThemeColor({ light: '#64748B', dark: '#94A3B8' });
  const borderColor = useThemeColor({ light: '#E2E8F0', dark: '#334155' });
  
  const sheetHeight = useSharedValue(0);
  const listHeight = useSharedValue(0);
  
  const selectedRoute = mockRoutes.find(route => route.id === selectedRouteId);
  const routeBuses = mockBuses.filter(bus => bus.routeId === selectedRouteId);
  
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setLocation(location.coords);
        }
      }
    })();
  }, []);
  
  useEffect(() => {
    if (selectedBus) {
      sheetHeight.value = withTiming(300);
      
      // Center map on selected bus
      mapRef.current?.animateToRegion({
        latitude: selectedBus.latitude,
        longitude: selectedBus.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      sheetHeight.value = withTiming(0);
    }
  }, [selectedBus]);
  
  useEffect(() => {
    if (showList) {
      listHeight.value = withTiming(height * 0.5);
    } else {
      listHeight.value = withTiming(0);
    }
  }, [showList]);
  
  const sheetAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: sheetHeight.value,
      transform: [
        {
          translateY: interpolate(
            sheetHeight.value,
            [0, 300],
            [300, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });
  
  const listAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: listHeight.value,
      transform: [
        {
          translateY: interpolate(
            listHeight.value,
            [0, height * 0.5],
            [height * 0.5, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const handleBusSelect = (bus) => {
    setSelectedBus(bus);
    setShowList(false);
  };
  
  const closeSheet = () => {
    setSelectedBus(null);
  };
  
  const toggleList = () => {
    setShowList(!showList);
    if (selectedBus) {
      setSelectedBus(null);
    }
  };
  
  const centerOnUserLocation = () => {
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['top']}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {selectedRoute && (
            <Polyline
              coordinates={selectedRoute.coordinates}
              strokeWidth={4}
              strokeColor="#1E40AF"
              lineDashPattern={[0]}
            />
          )}
          
          {routeBuses.map((bus) => (
            <Marker
              key={bus.id}
              coordinate={{ latitude: bus.latitude, longitude: bus.longitude }}
              title={`Bus #${bus.number}`}
              description={`Speed: ${bus.speed} mph`}
              onPress={() => handleBusSelect(bus)}
            >
              <View style={[
                styles.busMarker,
                { backgroundColor: bus.status === 'on-time' ? '#10B981' : '#F59E0B' }
              ]}>
                <BusIcon size={16} color="#FFFFFF" />
              </View>
            </Marker>
          ))}
          
          {selectedRoute?.stops.map((stop, index) => (
            <Marker
              key={`stop-${index}`}
              coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
              title={stop.name}
              description={`Scheduled: ${stop.time}`}
            >
              <View style={styles.stopMarker}>
                <MapPin size={16} color="#DC2626" />
              </View>
            </Marker>
          ))}
          
          {location && (
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="Your Location"
            >
              <View style={styles.userLocationMarker}>
                <View style={styles.userLocationDot} />
              </View>
            </Marker>
          )}
        </MapView>
        
        <View style={styles.mapControls}>
          <TouchableOpacity
            style={[styles.mapButton, { backgroundColor: cardBgColor }]}
            onPress={toggleList}
          >
            {showList ? <Filter size={20} color={textColor} /> : <List size={20} color={textColor} />}
          </TouchableOpacity>
          
          {Platform.OS !== 'web' && location && (
            <TouchableOpacity
              style={[styles.mapButton, { backgroundColor: cardBgColor }]}
              onPress={centerOnUserLocation}
            >
              <Navigation size={20} color={textColor} />
            </TouchableOpacity>
          )}
        </View>
        
        <Animated.View
          style={[
            styles.busListContainer,
            { backgroundColor: cardBgColor },
            listAnimatedStyle,
          ]}
        >
          <View style={styles.sheetHandle} />
          <Text style={[styles.listTitle, { color: textColor }]}>Available Buses</Text>
          
          <ScrollView style={styles.busList} showsVerticalScrollIndicator={false}>
            {routeBuses.map((bus) => (
              <BusListItem
                key={bus.id}
                bus={bus}
                onPress={() => handleBusSelect(bus)}
                textColor={textColor}
                secondaryTextColor={secondaryTextColor}
                borderColor={borderColor}
              />
            ))}
          </ScrollView>
        </Animated.View>
        
        {selectedBus && (
          <BusDetailSheet
            bus={selectedBus}
            onClose={closeSheet}
            animatedStyle={sheetAnimatedStyle}
            cardBgColor={cardBgColor}
            textColor={textColor}
            secondaryTextColor={secondaryTextColor}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapControls: {
    position: 'absolute',
    right: 16,
    top: 16,
    gap: 8,
  },
  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  busMarker: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  stopMarker: {
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    padding: 8,
    borderRadius: 20,
  },
  userLocationMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(29, 78, 216, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userLocationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1D4ED8',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  busListContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 12,
  },
  listTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  busList: {
    flex: 1,
  },
});