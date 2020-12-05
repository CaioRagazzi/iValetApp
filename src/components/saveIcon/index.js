import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';

export default function SaveIcon(props) {
  return (
    <TouchableOpacity>
      <SafeAreaView>
        <Icon
          type="MaterialIcons"
          style={styles.icon}
          name="save"
          size={24}
          onPress={() => props.onPress()}
        />
      </SafeAreaView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingRight: 10,
    color: '#ffffff',
  },
});
