import React, { useState, useEffect } from 'react'

const Loader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
                <div className="text-center">
                    {/* Rotating Square */}
                    <div className="relative w-20 h-20 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-lg animate-spin"></div>
                        <div className="absolute inset-2 border-4 border-orange-300 border-b-transparent rounded-lg animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                    </div>

                    <p className="text-gray-400 text-lg font-light tracking-wider">
                        Preparing Your Experience...
                    </p>
                </div>
            </div>
        );
    }

    return null;
}

export default Loader