import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaBars, FaBox, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-white h-screen shadow-md ${
        isCollapsed ? 'w-20' : 'w-64'
      } transition-width duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={isCollapsed ? 40 : 120}
          height={40}
          className="transition-width duration-300 ease-in-out"
        />
      </div>
      <nav className="mt-4">
        <ul>
          <li className="p-4 hover:bg-gray-100">
            <FaShoppingCart className="inline-block mr-2" />
            {!isCollapsed && <span>Gestão de pedidos</span>}
          </li>
          <li className="p-4 hover:bg-gray-100">
            <FaBox className="inline-block mr-2" />
            {!isCollapsed && <span>Estoque</span>}
          </li>
          <li className="p-4 hover:bg-gray-100">
            <FaUserCircle className="inline-block mr-2" />
            {!isCollapsed && <span>Escolas</span>}
          </li>
        </ul>
      </nav>
      <div className='mr-2'>
        <button onClick={handleToggle} className="flex p-4 items-center justify-center w-full">
            {isCollapsed ? <FaArrowRight size={16} /> : <FaArrowLeft size={16} />}
            </button>
        </div>
    </div>
  );
};

export default Sidebar;
