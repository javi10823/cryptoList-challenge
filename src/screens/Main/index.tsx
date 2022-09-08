import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {MainStackRoutes} from '../../navigation/routes';
import {replaceCharts, setCoins} from '../../store/slices/coins';

export const MainPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        const coins = await AsyncStorage.getItem('coins');
        if (coins) {
          dispatch(setCoins(JSON.parse(coins)));
        }

        const chartsKeys = await (
          await AsyncStorage.getAllKeys()
        ).filter(key => key.startsWith('charts-'));
        chartsKeys.forEach(async chartKey => {
          const chart = await AsyncStorage.getItem(chartKey);
          if (chart) {
            const obj = JSON.parse(chart);
            dispatch(
              replaceCharts({
                coin: chartKey.split('').splice(7).join(''),
                value: obj,
              }),
            );
          }
        });
      } finally {
        navigation.reset({
          routes: [{name: MainStackRoutes.LoginScreen as never}],
        });
      }
    };

    loadData();
  }, []);
  return <></>;
};
