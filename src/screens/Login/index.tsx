import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {setUsername} from '../../store/slices/user';
import {styles} from './styles';

const LoginScreen = () => {
  const [username, setUsernameState] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const login = () => {
    if (username === '') {
      return;
    }

    dispatch(setUsername(username));
    navigation.reset({
      routes: [{name: 'homeScreen' as never}],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsernameState}
        />
      </View>
      <View style={styles.col}>
        <Button mode="contained" onPress={login}>
          Log in
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;
