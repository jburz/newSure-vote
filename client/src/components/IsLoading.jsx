/*   ALL CODE WILL BE USED FOR FUTURE DEVELOPMENT



// import necessary modules/packages & components
import React, { useEffect, useState } from 'react';
import { Button, } from "react-bootstrap";
function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

// create functional component to hold data
const LoadingButton = () => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
        >
            {isLoading ? 'Loading…' : 'Click to load'}
        </Button>
    );
}

// export LoadingButton out of LoadingButton.jsx
export default LoadingButton;

 */