import React, {useState} from 'react';
import {Banner, render, useApplyCartLinesChange, useCartLines,} from '@shopify/checkout-ui-extensions-react';

render('Checkout::CartLines::RenderAfter', () => <App/>);

function App() {
    // Set up the states
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get a reference to the function that will apply changes to the cart lines from the imported hook
    const lines = useCartLines();
    const applyCartLinesChange = useApplyCartLinesChange();

    const id = "gid://shopify/ProductVariant/45036555469115";

    async function addUpsell() {
      return await applyCartLinesChange({
          type: "addCartLine",
          merchandiseId: id,
          quantity: 1,
        });
    }

    const isUpsellApplied = lines.some((item) => {
      return item.merchandise.id === id;
    });

    if(!isUpsellApplied) {
      addUpsell().then(r => {
        console.log(r, 111)
      });
    }

    return (
        <Banner title="upsell-app">
            sss
        </Banner>
    );
}