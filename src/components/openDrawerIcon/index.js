import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function OpenDrawerIcon(props) {
  return (
    <SafeAreaView>
      <Icon
        style={styles.icon}
        name="align-justify"
        size={28}
        onPress={() => props.onPress()}
        color="#FCFCFC"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 8,
  },
});
