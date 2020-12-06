import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Overlay, ListItem, Avatar} from 'react-native-elements';

export default function OverlayCompanies(props) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const handleItemPress = (item) => {
    setVisible(false);
    props.onPress(item);
  };

  const onClose = () => {
    setVisible(false);
    props.onClose(false);
  };

  const itemList = ({item}) => (
    <ListItem key={item.id} onPress={() => handleItemPress(item)} bottomDivider>
      <Avatar
        rounded
        title={item.name.substring(0, 2).toUpperCase()}
        containerStyle={styles.avatarContainer}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.listItem}>{item.name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <Overlay
      isVisible={visible}
      overlayStyle={styles.overlayContainer}
      onBackdropPress={onClose}>
      <View>
        {loading ? (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="#9E8170" />
          </View>
        ) : (
          <View>
            <View style={styles.title}>
              <Text style={styles.titleText}>Selecione o Estaciomanento</Text>
            </View>
            <FlatList
              data={props.companies}
              renderItem={itemList}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    width: '70%',
    height: '80%',
    borderRadius: 30,
    margin: 0,
    padding: 0,
    backgroundColor: '#FCFCFC',
  },
  title: {
    height: '30%',
    backgroundColor: '#38006b',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#FCFCFC',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    flex: 1,
  },
  avatarContainer: {
    backgroundColor: '#6a1b9a',
  },
  listItem: {
    fontSize: 18,
  },
  spinnerContainer: {
    flexGrow: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
});
