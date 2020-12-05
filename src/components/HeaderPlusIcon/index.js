import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HeaderPlusIcon(props) {
  return (
    <SafeAreaView>
      <Icon
        style={styles.icon}
        name="add-circle-outline"
        size={28}
        onPress={() => props.onPress()}
        color="#ffffff"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingRight: 10,
  },
});
