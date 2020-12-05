import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';

export default function BaseLayout(props) {
  return (
    <View style={styles.viewContainer}>
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        keyboardShouldPersistTaps="handled">
        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.cardTitle}>{props.title}</Card.Title>
          <View style={styles.subMainContainer}>{props.children}</View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  mainContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 15,
  },
  subMainContainer: {
    padding: 15,
  },
  cardTitle: {
    textAlignVertical: 'center',
    color: 'white',
    backgroundColor: '#4a148c',
    fontSize: 26,
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContainer: {
    padding: 0,
    borderRadius: 10,
    elevation: 5,
  },
});
