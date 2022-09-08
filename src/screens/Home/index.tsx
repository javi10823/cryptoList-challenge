import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Divider, Text, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {useGetFirst50CoinsQuery} from '../../store/apis/crypto';
import {CryptoItem} from './CryptoItem';
import {styles} from './styles';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import {MainStackRoutes} from '../../navigation/routes';
import {setCoins} from '../../store/slices/coins';

const HomeScreen = () => {
  const [filter, setFilter] = useState('');
  const [currentFilter, setCurrentFilter] = useState('');
  const [isConnected, setIsConnected] = useState<Boolean>();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const coins = useSelector((state: RootState) => state.coins.coins);
  const username = useSelector((state: RootState) => state.user.username);
  const {data} = useGetFirst50CoinsQuery({page: 0, limit: 50});
  const filteredData = useMemo(
    () =>
      !coins
        ? []
        : currentFilter !== ''
        ? coins.filter(
            item =>
              parseFloat(item.percent_change_24h) >= parseFloat(currentFilter),
          )
        : coins,
    [currentFilter, coins],
  );

  const addFilter = () => {
    setCurrentFilter(filter);
  };

  useEffect(() => {
    if (data?.data) {
      dispatch(setCoins(data.data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {!isConnected && <Text>No internet connection</Text>}
      <Text variant="titleLarge">Welcome {username}!</Text>
      <View style={[styles.row, styles.wFull]}>
        <TextInput
          style={styles.filterItem}
          label="Minimum 24% change"
          value={filter}
          onChangeText={setFilter}
        />
        <Button style={styles.filterItem2} mode="contained" onPress={addFilter}>
          Filter
        </Button>
      </View>
      <FlatList
        style={styles.flatlist}
        renderItem={({item}) => (
          <CryptoItem
            item={item}
            onPress={() =>
              navigation.navigate(
                MainStackRoutes.ChartScreen as never,
                {
                  crypto: item,
                } as never,
              )
            }
          />
        )}
        keyExtractor={item => item.id}
        data={filteredData}
        ItemSeparatorComponent={Divider}
      />
    </View>
  );
};

export default HomeScreen;
