import React from 'react';
import {View , ActivityIndicator} from 'react-native';
import { Colors } from '../../utils/constants';

const Spinner = () => (
  <View style={{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <ActivityIndicator color={Colors.main.PRIMARY}/>
  </View>
);

export default Spinner;