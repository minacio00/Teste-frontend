import React from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

const TopBar: React.FC = () => {
  return (
    <div className="bg-blue-900 text-white flex items-center justify-between p-4">
      <div className="flex items-center space-x-2">
        <FaSearch size={20} />
        <input
          type="text"
          placeholder="Pesquise aqui"
          className="bg-transparent outline-none placeholder-white"
        />
      </div>
      <div className="flex items-center space-x-4">
        <span>Usuário ADM</span>
        <div className="rounded-full bg-orange-500 p-2">
          <FaUserCircle size={24} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
