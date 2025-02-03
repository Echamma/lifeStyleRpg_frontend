import { useEffect, useState } from "react"

const Card = ({ Title, Desc, Exp, onDone, id }) => {
    const [holdTimer, setHoldTimer] = useState(null);
    const [isHolding, setIsHolding] = useState(false);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (holdTimer) clearTimeout(holdTimer);
        };
    }, [holdTimer]);

    const startHold = () => {
        setIsHolding(true);
        const timer = setTimeout(async () => {
            await onDone?.(Exp, id);
            setIsHolding(false);
        }, 2000);
        setHoldTimer(timer);
    };

    const endHold = () => {
        if (holdTimer) {
            clearTimeout(holdTimer);
            setIsHolding(false);
        }
    };

    return (
        <article
            className={`flex flex-col md:flex-row justify-between p-4 border-2 rounded-lg transition-all duration-300 ${
                isHolding 
                    ? 'bg-green-300 border-gray-500 scale-[0.99]' 
                    : 'bg-white border-gray-300'
            }`}
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            onTouchCancel={endHold}
        >
            <div className="flex-1 min-w-0 pr-4">
                <h2 className="font-bold text-lg truncate">{Title}</h2>
                <p className="text-gray-600 mt-2 line-clamp-10 break-words">
                    {Desc}
                </p>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 font-medium">
                    {Exp} XP
                </div>
            </div>
        </article>
    );
};

export default Card;