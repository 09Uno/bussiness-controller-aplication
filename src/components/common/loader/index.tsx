import React from "react";

interface LoaderProps {
    isLoading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({isLoading}) => {

    if (!isLoading) {
        return <React.Fragment></React.Fragment>;
    }
    return (
        <div id="loader" style={{
            backgroundColor: 'rgba(255,255,255,0.7)',
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 9999,
            left: '5%',
            top: '5%'
        }}>
            <div style={{
                display: 'flex',
                position: 'absolute',
                left: '32%',
                top: '50%'

            }}>

                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>

        </div>
    );
};