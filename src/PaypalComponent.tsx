// PaypalComponent.tsx

import { useEffect } from 'react';

interface PaypalComponentProps {
  total: number; // Assuming total is a number, all this to eliminate TypeScript error (TS is new to me at this stage), errors which I wouldn't have in JS
  selectedOptions: number[];
}

const PaypalComponent: React.FC<PaypalComponentProps> = ({ total, selectedOptions  }) => {
  useEffect(() => {
    // Load PayPal SDK script
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AbrHNrkkcPeX4oTjNSUd5j4dgBSd0RGp5dcjk9lSKeysEDR1UMJZsKypyD-X7jpjtTT9iiDl3yL53jaN';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize PayPal Buttons
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total.toString(),
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          // Capture the funds from the transaction
          return actions.order.capture().then((details) => {
            // Handle the successful payment here, it's a placeholder for backend API and database storage as to what was purchased and when. Minimal data should be stored, as in not more than necessery. One could assume the Toll Taking App runs on a kiosk connected release on electric impulse actuator, therefore there is no need to store more data:
            console.log(new Date().toISOString(), 'Payment completed:', details);
            console.log(selectedOptions)
          });
        },
      }).render('#paypal-button-container');
    };
  }, [total]);

  return (
    <div id="paypal-button-container" className="text-indigo-600 font-bold text-center text-xl mb-4">
      {total > 0 ? `Pay: ${total} As` : 'Pay: please select one of the above options first'}
    </div> // it on purpose renders PayPal / card payment options, even if nothing was selected, to show new users which payment options are available
  );  
};

export default PaypalComponent;

// flashing of this component after reselecting the items is just as intended. It provides a visual que to the user, that indeed everything updated

// hiding the not so minimalistic "Powered by PayPal" text, may violate PayPal's terms of use and branding guidelines, therefore I left it as is, without looking further into it at this stage

// click onto the buttons, it's in Paypal's sandboxie mode. After logging in (as it's a Sandbox - even with a fake email/password not registered with PayPal), it displays the correct ammount :) although not in As, as PayPal doesn't seem to support extinct Roman currencies