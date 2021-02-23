import React from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Colors } from '../../utils/constants';
import { scaleFont } from '../../utils/mixins';
import { MaterialIcons } from '@expo/vector-icons'; 
import Title from '../../components/title/title';
import { ShopModel } from '../../models/shop';
import { FontAwesome } from '@expo/vector-icons'; 


interface Props {
  shop: ShopModel
  onPress: (item: ShopModel) => void;
}

class ShopListItem extends React.Component<Props, { expanded: boolean}> {
  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: false
    }
    
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  
  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  }


  render() {
    const { shop, onPress } = this.props;

    return (
      <TouchableOpacity
        onPress={this.toggleExpand}
        style={{
          shadowColor: Colors.grayscale.GRAY_LIGHT,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.36,
          shadowRadius: 5.68,
          elevation: 1,
          marginBottom: 20,
          flexDirection: 'column',
          backgroundColor: '#FFF',
          borderRadius: 5,
          borderTopColor: Colors.actions.ALERT,
          borderTopWidth: 5,
          padding: 15,
          paddingVertical: 20,
      }}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 9}}>
          <View style={{flexDirection: 'row'}}>
          <View style={{flex: 12, alignContent: 'center'}}>
              <Title color={Colors.grayscale.BLACK}>
                {shop.name}
              </Title>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 12,
                height: 30,
                alignItems: 'center',
                flexDirection: 'row',
                alignContent: 'center',
              }}>
            

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                <MaterialIcons name="category" size={13} color={Colors.actions.WARNING} />
                
                <Text
                  style={{
                    paddingLeft: 10,
                    fontSize: scaleFont(12),
                  }}>
                  {shop.category}
                </Text>
              </View>
            </View>
          </View>
          {this.state.expanded && 
            <View
            style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
            <View style={{flex: 8, alignContent: 'center'}}>
              <Text
                style={{
                  fontSize: scaleFont(13),
                }}>
                <Text style={{ textDecorationLine: 'underline'}}>Domain</Text>{`: ${shop.domain}`}
              </Text>
              <Text
                style={{
                  fontSize: scaleFont(13),
                }}>
                  <Text style={{ textDecorationLine: 'underline'}}>ID</Text>{`: ${shop._id}`}
              </Text>
            </View>
          </View>
          
          
          }        
        </View>

        <View
          style={{
            flex: 1,
            height: 30,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity onPress={() => onPress(shop)}>
            <FontAwesome 
              name="star" 
              size={20} 
              color={shop.favorite
                ? Colors.actions.YELLOW
                : Colors.grayscale.GRAY_LIGHT} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
    )
  }
}

export default ShopListItem;
