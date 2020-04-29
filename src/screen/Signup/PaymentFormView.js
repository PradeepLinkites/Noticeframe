import React from 'react';
import { ActivityIndicator,StyleSheet, Text, View, Button,Dimensions } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import AwesomeButton from 'react-native-really-awesome-button'
import { isEmpty} from 'lodash'
import { AppFonts, AppSizes, AppColors, AppStyles } from '../../theme'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
// import { FontAwesome } from '@expo/vector-icons';

export default class PaymentFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      cardData: { valid: false }
     };
  }

  render() {
    const { onSubmit, submitted, error, isLoading  } = this.props;
    // const { isLoading } = this.state
    return (
      <View>
        <View>
          <CreditCardInput requiresName onChange={(cardData) => this.setState({ cardData })} />
        </View>
        <View style={styles.buttonWrapper}>
          <AwesomeButton
            type="primary"
            color={'#FFF'}
            backgroundColor={!this.state.cardData.valid || this.props.planId === '' ? 'gray' : AppColors.app.button }
            backgroundDarker={!this.state.cardData.valid || this.props.planId === '' ? 'gray' : AppColors.app.buttonShadow}
            height={AppSizes.verticalScale(40)}
            width={deviceWidth - 200}
            textSize={AppSizes.verticalScale(14)}
            borderRadius={50}
            style={{ marginTop: 20 ,alignSelf: 'center'}}
            disabled={!this.state.cardData.valid || submitted || this.props.planId === '' }
            onPress={() => onSubmit(this.state.cardData)}
          >      
            { isLoading ?
              <ActivityIndicator size="small" color="#FFF" />
              :
              'Subscribe'
            }
          </AwesomeButton>
          {error && (
            <View style={styles.alertWrapper}>
              <View style={styles.alertIconWrapper}>
                {/* <FontAwesome name="exclamation-circle" size={20} style={{ color: '#c22' }} /> */}
              </View>
              <View style={styles.alertTextWrapper}>
                <Text style={styles.alertText}>{error}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  buttonWrapper: {
    padding: 10,
    zIndex: 100
  },
  alertTextWrapper: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertIconWrapper: {
    padding: 5,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertText: {
    color: '#c22',
    fontSize: 16,
    fontWeight: '400'
  },
  alertWrapper: {
    backgroundColor: '#ecb7b7',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 10
  }
});