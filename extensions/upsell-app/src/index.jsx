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
    const {trigger_products,variant, title} = useSettings();
    const [showBanner, setShowBanner] = useState(false);
    let isTriggerAdded;

    async function addUpsell(variant) {
        return await applyCartLinesChange({
            type: "addCartLine",
            merchandiseId: variant,
            quantity: 1,
        });
    }

    if (!variant) {
        return null;
    }

    if(trigger_products) {
        const trigger_products_arr = trigger_products.split("\n");

        isTriggerAdded = lines.some((item) => {
            return trigger_products_arr.includes(item.merchandise.id);
        });
    }

    const isUpsellApplied = lines.some((item) => {
        return item.merchandise.id === variant;
    });

    if(trigger_products && !isTriggerAdded) {
        return null;
    }

    if(!isUpsellApplied) {
        addUpsell(variant).then(() => {
            setShowBanner(true);

            setTimeout(() => {
                setShowBanner(false);
            },5000)
        });
    }

    return (
        <BlockStack>
            {showBanner && title && (
                <Banner title={title} status={"success"} collapsible={false}/>
            )}
        </BlockStack>
    );
}