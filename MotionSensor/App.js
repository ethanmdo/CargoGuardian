import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [prevData, setPrevData] = useState({ x: 0, y: 0, z: 0 });
  const [abruptMotion, setAbruptMotion] = useState(false);

  const threshold = 2; // Adjust this value based on sensitivity

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    const deltaX = Math.abs(data.x - prevData.x);
    const deltaY = Math.abs(data.y - prevData.y);
    const deltaZ = Math.abs(data.z - prevData.z);

    if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
      setAbruptMotion(true);
      setTimeout(() => setAbruptMotion(false), 500);  // Reset after half a second
    }

    setPrevData(data);
  }, [data]);

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(1000);  // Adjust the update interval as needed
    Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
  };

  const _unsubscribe = () => {
    Accelerometer.removeAllListeners();
  };

  return (
    <View style={styles.container}>
      <Text>Abrupt motion detected: {abruptMotion ? 'Yes' : 'No'}</Text>
      {/* The rest of your app components go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
