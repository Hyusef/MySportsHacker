import React from 'react';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';



export default function Header() {
    return (
        <>
            <Gradient name="summer">
                <BigText
                    text="SportsHacker"
                    align='center'
                    font='pallet'
                />
            </Gradient>
        </>
    )
}

