import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native';
import ShopsStore from '../../stores/shop';
import ShopListItem from './ShopListItem';
import { ShopModel } from '../../models/shop';
import RootStore from '../../stores/root';
import Spinner from '../../components/spinner/spinner';
import { toJS } from 'mobx';
import { Colors, TABS_ROUTE_NAME } from '../../utils/constants';
import { NavigationScreenProp } from 'react-navigation';
import { RouteProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationScreenProp<any,any>,
  route: RouteProp<any,any>;
  shopsStore: ShopsStore,
}

@inject(({ rootStore }: {rootStore: RootStore}) => ({
  shopsStore: rootStore.shopsStore,
}))
@observer
class ShopsScene extends React.Component<Props> {
  _unsubscribeFocus: any;
  _unsubscribeBlur: any;
  callOnScrollEnd: boolean = false;

  state = {
    focus: false,
  }
  
  componentDidMount() {
    this.props.shopsStore.getShops();
    
    this._unsubscribeFocus = this.props.navigation.addListener('focus', async () => {
      this.setState({ focus: true });
    });
    this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
      this.setState({ focus: false });
     
    });    
  }

   componentWillUnmount() {
    this._unsubscribeFocus();
    this._unsubscribeFocus();
  }

  renderFooter = () => {
    if (!this.props.shopsStore.isLoading) return null;
    return (
      <View style={{paddingVertical: 50}}>
        <Spinner />
      </View>
    );
  };

  reset = () => {
    this.props.shopsStore.reset();
    this.props.shopsStore.getShops();
  }

  handleFavorite = (item: ShopModel) => {
    this.props.shopsStore.toggleFavorite(item._id);
  }
 
  renderItem = ({item}: {item: ShopModel}) => (
    <ShopListItem 
      shop={item}
      onPress={this.handleFavorite}
    />
  );

  keyExtractor = (item: ShopModel) => item._id.toString();

  handleLoadMore = () => {
    if (this.props.route.name === TABS_ROUTE_NAME.SHOPS) {
      this.props.shopsStore.fetchShops();
    }
  }
  
  render() {
    const { shopsStore } = this.props;

    if (!this.state.focus) {
      return <Spinner />
    }

    const shops = this.props.route.name === TABS_ROUTE_NAME.SHOPS 
      ? toJS(shopsStore.shops)
      : toJS(shopsStore.shops.filter(shop => shop.favorite === true));

    console.log('Numero de tiendas ', shops.length);
    console.log('Ruta ', this.props.route);
      
    return (
      <View style={{ flex: 1 }}>
        {this.props.route.name === TABS_ROUTE_NAME.SHOPS && 
          <View style={{ padding : 20 }}>
            <TouchableOpacity
              onPress={this.reset}
              style={styles.resetButton}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        }
        
      <FlatList
        style={{padding: 20}}
        data={shops}
        keyExtractor={this.keyExtractor}
        removeClippedSubviews={Platform.OS === 'ios' ? false: true} // Unmount components when outside of window 
        initialNumToRender={10} 
        maxToRenderPerBatch={4} 
        updateCellsBatchingPeriod={50}
        windowSize={5} 
        renderItem={this.renderItem}
        onEndReachedThreshold={0.3}
        onEndReached={() => this.callOnScrollEnd = true}
        onMomentumScrollEnd={() => {
          this.callOnScrollEnd && this.handleLoadMore();
          this.callOnScrollEnd = false;
        }}
        ListFooterComponent={this.renderFooter}
      /> 
      </View> 
    );
    
  }
}

const styles = StyleSheet.create({
  resetButton:{
    backgroundColor: Colors.actions.ALERT,
    flexDirection: 'row',
    borderRadius: 6,
    paddingVertical: 13,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  
  resetButtonText:{
    color: Colors.grayscale.WHITE,
    fontSize: 16,
    fontWeight: '700'
  },
});

export default ShopsScene;