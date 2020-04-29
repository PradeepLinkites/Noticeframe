import React from 'react';
import PaymentFormView from './PaymentFormView';
import { get } from 'lodash'

const STRIPE_ERROR = 'Payment service error. Try again later.';
const SERVER_ERROR = 'Server error. Try again later.';
// Test Key Stripe
const STRIPE_PUBLISHABLE_TEST_KEY = 'pk_test_Z31T3tdLlH4TOy5dehvV7TzK00rsPSWHUh';
// Live Key Stripe
const STRIPE_PUBLISHABLE_LIVE_KEY = 'pk_live_zvGwo97o9oTIyYa6YFRTjllq00JXX9cmUe';

const getCreditCardToken = (creditCardData) => {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_LIVE_KEY}`
    },
    method: 'post',
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).then(response => response.json());
};

const subscribeUser = (creditCardToken) => {
  return new Promise((resolve) => {
    // console.log('Credit card token\n', creditCardToken);
    setTimeout(() => {
      resolve({ status: true });
    }, 1000)
  });
};

export default class AddSubscription extends React.Component {
  static navigationOptions = {
    title: 'Subscription page',
  };
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      error: null
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit = async (creditCardInput) => {
    // console.log('mycreditCardInput=>',creditCardInput)
    const { navigation } = this.props;

    this.setState({ submitted: true });
    let creditCardToken;
    try {

      creditCardToken = await getCreditCardToken(creditCardInput);
      if (creditCardToken.error) {

        this.setState({ submitted: false, error: STRIPE_ERROR });
        return;
      }
    } catch (e) {
      this.setState({ submitted: false, error: STRIPE_ERROR });
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      this.setState({ submitted: false, error: SERVER_ERROR });
    } else {
      this.setState({ submitted: false, error: null });
      this.props.updateCard(creditCardToken)
    }
  };

  render() {
    const { submitted, error } = this.state;
    return (
        <PaymentFormView
          error={error}
          submitted={submitted}
          onSubmit={this.onSubmit}
          {...this.props}
        />
    );
  }
}