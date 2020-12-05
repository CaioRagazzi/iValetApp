import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../../contexts/auth';

export default function HomeClientScreen() {
  const authContext = useContext(AuthContext);

  const handleLogOut = () => {
    authContext.logOut();
  };

  return (
    <View>
      <Text> Home Client </Text>
      <Button title="Deslogar" onPress={() => handleLogOut()} />
    </View>
  );
}
