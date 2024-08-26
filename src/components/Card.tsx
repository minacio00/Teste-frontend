import React from 'react';

interface CardProps {
    title: string;
    icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon }) => {
    return (
        <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between">
            <div>
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
            </div>
            <div className="text-4xl text-gray-400">
                {icon}
            </div>
        </div>
    );
};

export default Card;
