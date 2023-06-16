import React, {useState} from 'react';
import {
    Banner,
    BlockStack,
    render,
    useApplyCartLinesChange,
    useCartLines, useSettings,
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::CartLines::RenderAfter', () => <App/>);

function App() {
    const lines = useCartLines();
    const applyCartLinesChange = useApplyCartLinesChange();
    const {variant, title, description, collapsible, status: merchantStatus} = useSettings();
    const status = merchantStatus ?? 'info';
    const [showBanner, setShowBanner] = useState(false);

    if (variant) {
        return  null;
    }

    async function addUpsell() {
       await applyCartLinesChange({
          type: "addCartLine",
          merchandiseId: variant,
          quantity: 1,
       });
    }

    const isUpsellApplied = lines.some((item) => {
      return item.merchandise.id === id;
    });

    if(!isUpsellApplied) {
      addUpsell().then(r => {
          setShowBanner(true);

          setTimeout(() => {
              setShowBanner(false);
          },5000)
      });
    }

    return (
        <BlockStack>
            {showBanner && (
                <Banner title={title} status={status} collapsible={collapsible}>
                    {description}
                </Banner>
            )}
        </BlockStack>
    );
}