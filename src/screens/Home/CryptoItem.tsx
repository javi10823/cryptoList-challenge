import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {styles} from './styles';
import {ItemProps} from './types';

export const CryptoItem = ({item, onPress}: ItemProps) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.row}>
        <Text variant="titleMedium">{item.name} </Text>
        <Text variant="labelSmall">({item.symbol})</Text>
      </View>
      <Text variant="bodyMedium">Current price: {item.price_usd} U$D</Text>
      <Text variant="bodyMedium">24h change: {item.percent_change_24h}%</Text>
    </TouchableOpacity>
  );
};
