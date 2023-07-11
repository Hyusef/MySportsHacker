import React from 'react';
import Spinner from 'ink-spinner';
import {Text} from 'ink';

export default function Spinners() {
    return (
        <>
            <Text>
                <Text color="red">
                    <Spinner type="dots" />
                </Text>
                {' Loading'}
            </Text>
        </>
    )
}
