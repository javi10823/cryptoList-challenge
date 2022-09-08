import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';
import {Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {useInterval} from '../../hooks/interval';
import {RootState} from '../../store';
import {useGetCoinQuery} from '../../store/apis/crypto';
import {addToCharts} from '../../store/slices/coins';
import {Coin} from '../../types/crypto';
import {styles} from './styles';

const ChartScreen = () => {
  const [isConnected, setIsConnected] = useState<boolean>();
  const {params} = useRoute<RouteProp<{params: {crypto: Coin}}>>();
  const charts = useSelector((state: RootState) => state.coins.charts);
  const requests = useSelector(
    (state: RootState) => state.coins.requests[params.crypto.id],
  );
  const id = parseInt(params.crypto.id, 10);

  const dispatch = useDispatch();
  const prices = useMemo(() => charts[id] || [], [charts, id]);
  const {data, isSuccess, isFetching, refetch} = useGetCoinQuery(
    {
      id,
    },
    {
      skip: requests >= 5,
    },
  );
  const {time, isOn, toggleOn} = useInterval(refetch, 30);

  useEffect(() => {
    if (requests >= 5 && isOn) {
      toggleOn(false);
    }
  }, [isOn, requests, toggleOn]);

  useEffect(() => {
    if (!isFetching && isSuccess) {
      dispatch(
        addToCharts({
          coin: data[0].id,
          value: parseFloat(data[0].price_usd),
        }),
      );
    }
  }, [isFetching, isSuccess, data, dispatch]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {!isConnected && <Text>No internet connection</Text>}
      <View style={styles.row}>
        <Text variant="titleLarge">{params?.crypto.name}</Text>
      </View>
      <View style={[styles.row, styles.chart]}>
        <LineChart
          style={styles.chart}
          data={{
            dataSets: [
              {
                label: 'BTC',
                values: prices.map(price => ({y: price})),
              },
            ],
          }}
        />
      </View>
      <View style={styles.row}>
        <Text>
          {isOn ? 'Updating in ' + time + ' seconds' : 'Limit reached'}
        </Text>
      </View>
    </View>
  );
};

export default ChartScreen;
