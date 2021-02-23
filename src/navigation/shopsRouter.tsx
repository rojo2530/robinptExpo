import  React from 'react';
import { Tab } from './navigators';
import ShopsScene from '../scenes/shops/ShopsScene';
import { Text } from 'react-native';
import { Colors } from '../utils/constants';
import { TAB_BAR_ICON_SIZE } from '../utils/constants';
import { Entypo } from '@expo/vector-icons'; 
import { NavigationScreenProp } from 'react-navigation';



interface Props {
  navigation: NavigationScreenProp<any,any>;
}

export default class ShopsRouter extends React.Component<Props> {
  render() {
    let tabColor = Colors.main.PRIMARY;

    return (
      <Tab.Navigator
        initialRouteName="ShopsList"
        lazy={true}
        screenOptions={({ route }) => ({
          tabBarLabel: ({ focused }) => {
            switch (route.name) {
            case 'ShopsList':
              tabColor =  Colors.main.PRIMARY;
              break;
            }
            return (
              <Text
                style={{
                  fontSize: 14,
                  textAlign:'center',
                  color: focused
                    ? tabColor
                    : Colors.grayscale.GRAY_MEDIUM,
                  
                }}>
                {route.name === 'ShopsList' ? 'All' : 'Favorites'}
              </Text>
            );
          },
     
          tabBarIcon: ({focused}) => {
            let iconColor = focused
              ? Colors.main.PRIMARY
              : Colors.grayscale.GRAY_MEDIUM;
            
            let icon;

            switch (route.name) {
              case 'ShopsList':
                tabColor = Colors.main.PRIMARY;
                icon = <Entypo name="shop" color={iconColor} size={TAB_BAR_ICON_SIZE} />
                break;

              case 'ShopsFavoriteList':
                tabColor = Colors.main.PRIMARY;
                icon = <Entypo name="star" color={iconColor} size={TAB_BAR_ICON_SIZE} />
                break;
            }
            
            return icon;
          }, 
        })}
        
        tabBarOptions={{
          inactiveTintColor: Colors.grayscale.GRAY_MEDIUM,
          activeTintColor: tabColor,
          showIcon: true,
          // showLabel: true,
          // scrollEnabled: true,
          indicatorStyle: {
            backgroundColor:tabColor
          },
        }}  
      >
        <Tab.Screen name="ShopsList" component={ShopsScene}/>
        <Tab.Screen name="ShopsFavoriteList" component={ShopsScene}/>
      </Tab.Navigator>
    );
  }
}

