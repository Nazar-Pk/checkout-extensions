import React from 'react';
import {render, Link, Modal, TextBlock, useShippingAddress, useSettings} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App/>);

function App() {
    const {provinceCode} = useShippingAddress();
    const {link_text, modal_text, states_exceptions} = useSettings();
    const states_arr = states_exceptions.split("\n");
    const isHidden = states_arr.includes(provinceCode);

    if (!isHidden) {
        return (
            <Link
                overlay={
                    <Modal padding>
                        <TextBlock>
                            {modal_text}
                        </TextBlock>
                    </Modal>
                }
            >
                {link_text}
            </Link>
        );
    } else {
        return null;
    }
}