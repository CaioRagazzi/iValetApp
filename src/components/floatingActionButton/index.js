import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import {Icon} from 'native-base';

export default function FloatingActionButton(props) {
  const getIcon = () => {
    if (props.icon) {
      return props.icon;
    } else {
      return (
        <Icon
          style={styles.icon}
          type="MaterialIcons"
          name="directions-car"
          size={24}
        />
      );
    }
  };

  const getContent = () => {
    if (props.isLoading) {
      return <ActivityIndicator color="#ffffff" />;
    } else {
      return (
        <View>
          {getIcon()}
          {getText()}
        </View>
      );
    }
  };

  const getText = () => {
    return <Text style={styles.text}>{props.text}</Text>;
  };

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={props.onPress}>
      {getContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#4a148c',
    borderRadius: 100,
    elevation: 8,
  },
  text: {
    color: '#ffffff',
    fontSize: 12,
  },
  icon: {
    alignSelf: 'center',
    color: '#ffffff',
  },
});
