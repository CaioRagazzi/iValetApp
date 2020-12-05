import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';

export default function OverlayLoading(props) {
  return (
    <Overlay
      isVisible={props.isLoading}
      fullScreen
      overlayStyle={styles.loadingContainer}>
      <ActivityIndicator color="#12005e" size="large" />
    </Overlay>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
});
