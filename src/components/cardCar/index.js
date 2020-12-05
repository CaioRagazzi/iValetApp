import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import {format, parseISO, formatDistance} from 'date-fns';

export default function CardCar({onPress, data}) {
  return (
    <TouchableOpacity onPress={() => (onPress ? onPress() : null)}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.cardTitle}>
          {data.placa.toUpperCase()}
        </Card.Title>
        <View>
          <View style={styles.textsDescriptionsContainer}>
            <Text style={styles.textTitle}>Entrada:</Text>
            <Text style={styles.textDescription}>
              {format(parseISO(data.startDate), 'dd/MM/yyyy HH:mm:ss')}
            </Text>
          </View>
          <View style={styles.textsDescriptionsContainer}>
            <Text style={styles.textTitle}>Tempo Total:</Text>
            <Text style={styles.textDescription}>
              {formatDistance(parseISO(data.startDate), new Date())}
            </Text>
          </View>

          {data.prisma > 0 ? (
            <View style={styles.textsDescriptionsContainer}>
              <Text style={styles.textTitle}>Prisma:</Text>
              <Text style={styles.textDescription}>{data.prisma}</Text>
            </View>
          ) : null}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    elevation: 5,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 20,
  },
  textsDescriptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 16,
  },
  textDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});
