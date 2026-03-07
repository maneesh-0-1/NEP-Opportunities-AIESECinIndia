import React, { useMemo } from 'react';
import './BackgroundFluid.css';

const BackgroundFluid = () => {
    // Generate an array of 50 items for mapping 50 distinct particles
    // We use useMemo to ensure the random values stay consistent across re-renders
    const orbs = useMemo(() => {
        return Array.from({ length: 50 }, (_, i) => {
            const size = Math.floor(Math.random() * 30) + 10; // 10vw to 40vw
            const top = Math.floor(Math.random() * 120) - 10; // -10% to 110%
            const left = Math.floor(Math.random() * 120) - 10; // -10% to 110%
            const duration = Math.floor(Math.random() * 20) + 15; // 15s to 35s
            const opacity = (Math.random() * 0.4 + 0.4).toFixed(2); // 0.4 to 0.8
            const reverse = Math.random() > 0.5 ? 'alternate-reverse' : 'alternate';

            return {
                id: i,
                style: {
                    width: `${size}vw`,
                    height: `${size}vw`,
                    top: `${top}%`,
                    left: `${left}%`,
                    animationDuration: `${duration}s`,
                    animationDirection: reverse,
                    opacity: opacity,
                }
            };
        });
    }, []);

    return (
        <>
            <div className="liquid-bg">
                {orbs.map(orb => (
                    <div key={orb.id} className="liquid-orb" style={orb.style}></div>
                ))}
            </div>
            <div className="background-grid"></div>
        </>
    );
};

export default BackgroundFluid;
