import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import axios from '../services/axios';
import socketIo from 'socket.io-client';
import {AuthContext} from '../contexts/auth';

export const GatewayContext = createContext();

export const GatewayProvider = ({children}) => {
  const {companyId, token} = useContext(AuthContext);
  const [io, setIo] = useState(null);
  const [openedTransactions, setOpenedTransactions] = useState([]);
  const [finishedTransactions, setFinishedTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = socketIo.connect('http://192.168.0.4:8082/', {
      query: {token},
    });
    setIo(socket);

    socket
      .on(`openedTransactions:company:${companyId}`, (msg) => {
        addOpenedTransactions(msg);
      })
      .on(`finishedTransactions:company:${companyId}`, (msg) => {
        addFinishedTransactions(msg);
      })
      .on('connect', () => {
        console.log('connected');
      })
      .on('disconnect', () => {
        console.log('disconnected');
      });

    getOpenedCars();
    getFinishedCars();
    return function cleanup() {
      console.log('cleaning');
      socket.disconnect();
    };
  }, [companyId, getOpenedCars, getFinishedCars, token]);

  const addOpenedTransactions = (msg) => {
    setLoading(true);
    setOpenedTransactions(msg);
    setLoading(false);
  };

  const addFinishedTransactions = (msg) => {
    setLoading(true);
    setFinishedTransactions(msg);
    setLoading(false);
  };

  const getOpenedCars = useCallback(() => {
    setLoading(true);
    axios
      .get(`transaction/opened/${companyId}`)
      .then((res) => {
        addOpenedTransactions(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [companyId]);

  const getFinishedCars = useCallback(() => {
    axios
      .get(`transaction/finished/${companyId}`)
      .then((res) => {
        addFinishedTransactions(res.data);
      })
      .catch(() => {});
  }, [companyId]);

  return (
    <GatewayContext.Provider
      value={{
        openedTransactions,
        getOpenedCars,
        loading,
        finishedTransactions,
        getFinishedCars,
      }}>
      {children}
    </GatewayContext.Provider>
  );
};
