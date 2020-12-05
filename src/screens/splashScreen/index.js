import React, {useEffect, useContext} from 'react';
import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import axios from '../../services/axios';

import {AuthContext} from '../../contexts/auth';

export default function LoadingScreen() {
  const {setLogged, setType, setSplash, setCompanyId, setToken} = useContext(
    AuthContext,
  );
  useEffect(() => {
    setTimeout(() => {
      const getToken = async () => {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
          setType(0);
          setLogged(false);
        } else {
          setToken(token);
          var decodedToken = jwt_decode(token);
          if (decodedToken.idPerfil === 1) {
            await axios
              .get(`user/${decodedToken.id}`)
              .then((res) => {
                setType(1);
                setLogged(true);
                setCompanyId(res.data.company[0].id);
              })
              .catch(() => {
                setType(0);
                setLogged(false);
              });
          } else {
            setType(2);
            setLogged(true);
          }
        }
        setSplash(false);
      };
      getToken();
    }, 2500);
  }, [setLogged, setSplash, setType, setCompanyId, setToken]);

  return (
    <View style={styles.viewContainer}>
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        keyboardShouldPersistTaps="handled">
        <ActivityIndicator size="large" color="#9E8170" />
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
  },
});
