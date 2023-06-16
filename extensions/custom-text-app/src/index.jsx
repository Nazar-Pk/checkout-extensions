import React from 'react';
import {render, Link, Modal, TextBlock, useShippingAddress, useSettings} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App/>);

function App() {
    const {provinceCode} = useShippingAddress();
    const {link_text, modal_text, states_exceptions} = useSettings();
    let isShown;

    if (!link_text || !modal_text) {
        return null;
    }

    if (states_exceptions) {
        isShown = states_exceptions.split("\n").includes(provinceCode);
    }

    if (!states_exceptions || (states_exceptions && isShown)) {
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