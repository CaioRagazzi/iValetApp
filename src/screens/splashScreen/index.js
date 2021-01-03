import React, {useEffect, useContext, useState} from 'react';
import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import axios from '../../services/axios';
import OverlayCompanies from '../../components/overlayCompanies/index';

import {StoreContext} from '../../store/rootStore';
import {observer} from 'mobx-react-lite';

const LoadingScreen = () => {
  const {authStore} = useContext(StoreContext);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const getToken = async () => {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
          authStore.setNotLoggedIn();
        } else {
          authStore.setToken(token);
          var decodedToken = jwt_decode(token);
          if (decodedToken.idPerfil === 1) {
            await axios
              .get(`user/${decodedToken.id}`)
              .then((res) => {
                if (res.data.companies.length > 1) {
                  setCompanies(res.data.companies);
                  setOverlayVisible(true);
                } else {
                  const companyId = res.data.companies[0].id;
                  authStore.setLoggedIn(1, companyId);
                }
              })
              .catch(() => {
                authStore.setNotLoggedIn();
              });
          } else {
            authStore.setLoggedIn(2);
          }
        }
      };
      getToken();
    }, 2500);
  }, [
    authStore.logged,
    authStore.splash,
    authStore.type,
    authStore.token,
    authStore,
  ]);

  const closeOverlay = () => {
    setOverlayVisible(false);
    authStore.logOut();
  };

  const handleSelectedCompany = async (value) => {
    setOverlayVisible(false);
    authStore.setLoggedIn(1, value.id);
  };

  return (
    <View style={styles.viewContainer}>
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        keyboardShouldPersistTaps="handled">
        <ActivityIndicator size="large" color="#9E8170" />
        <OverlayCompanies
          visible={overlayVisible}
          companies={companies}
          onPress={handleSelectedCompany}
          onClose={() => closeOverlay()}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  mainContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default observer(LoadingScreen);
