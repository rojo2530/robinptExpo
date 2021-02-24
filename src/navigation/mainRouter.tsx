import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Stack } from './navigators';
import ShopsRouter from './shopsRouter';
// import ShopDetailScene from '../scenes/shop/ShopDetailScene';
import { CardStyleInterpolators } from '@react-navigation/stack';

const MainRouter = () => (
  <NavigationContainer>
    <StatusBar
      animated={true}
      barStyle="light-content"
      hidden={false}
      backgroundColor={'#1B9BD7'}
      translucent={true}
    />
    <Stack.Navigator
      initialRouteName="Shops" 
      headerMode="float"
      screenOptions={{
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, 
        headerStyle: {
          backgroundColor: "#1B9BD7",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",
      }} 
    >
      <Stack.Screen
        name={"Shops"}
        component={ShopsRouter}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
   


export default MainRouter; 
