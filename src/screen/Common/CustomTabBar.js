import React from 'react'
import { 
  Image,
  Alert,
  FlatList,
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
} from 'react-native'

var tabsArray = [
   { tabName: 'Daily',
	 icon: require('../../assets/Home_assets/Daily.png') ,
	 icon_select: require('../../assets/Home_assets/Daily_select.png') 
   },
   { tabName: 'Weekly' ,
	  icon: require('../../assets/Home_assets/Weekly.png'), 
	  icon_select: require('../../assets/Home_assets/Weekly_select.png') 
   },
   { tabName: 'Monthly' ,
	 icon: require('../../assets/Home_assets/Monthly.png') ,
	 icon_select: require('../../assets/Home_assets/Monthly_select.png') 
   },
   { tabName: 'slideshow',
	 icon: require('../../assets/Home_assets/slideshow.png') ,
	 icon_select: require('../../assets/Home_assets/slideshow_select.png') 
   },
   { tabName: 'Events' ,
	 icon: require('../../assets/Home_assets/event.png') ,
	 icon_select: require('../../assets/Home_assets/event_select.png') 
   },
   { tabName: 'ListView',
	 icon: require('../../assets/Home_assets/list.png') ,
	 icon_select: require('../../assets/Home_assets/list_select.png') 
   },
]

export default class CustomTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

   tabView =()=> {
    return tabsArray.map((object, index) => {
      return(
			<TouchableOpacity onPress={this.props.changeTab.bind(this, index, object.tabName)} style={styles.tabButtonView}>
				{object.tabName === this.props.routeName
				  ? 
					<Image source={object.icon_select}/>
					:
					<Image source={object.icon}/>
				}
         </TouchableOpacity>
         )
      })
   }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tabBarView}>  
          {this.tabView()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarView: {
	backgroundColor:'#fff',
	width: '100%',
	flexDirection: 'row',
	justifyContent: 'space-between',
	borderBottomColor:'lightgray',
	borderBottomWidth: 1.2,
	paddingBottom: 15,
	paddingTop: 15
  },
  tabButtonView: {
	justifyContent:'center',
	alignItems:'center',
	paddingLeft: 20,
	paddingRight: 10
  }
})