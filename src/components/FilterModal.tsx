import React, { useState } from 'react';

interface FilterModalProps {
    onClose: () => void;
    onFilter: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ onClose, onFilter }) => {
    const [dateFilter, setDateFilter] = useState<string>('Todos');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    const handleFilterClick = () => {
        const filters = {
            date: dateFilter,
            status: statusFilter
        };
        onFilter(filters);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-80">
                <h2 className="text-lg font-semibold mb-4">Filtro</h2>
                <div className="mb-4">
                    <h3 className="font-medium mb-2">Por data</h3>
                    <select 
                        value={dateFilter} 
                        onChange={(e) => setDateFilter(e.target.value)} 
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="Todos">Todos</option>
                        <option value="7">até 7 dias</option>
                        <option value="15">até 15 dias</option>
                        <option value="30">até 30 dias</option>
                        <option value=">30">Mais de 30 dias</option>
                    </select>
                </div>
                <div className="mb-4">
                    <h3 className="font-medium mb-2">Por status</h3>
                    <select 
                        value={statusFilter || ''} 
                        onChange={(e) => setStatusFilter(e.target.value)} 
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Escolha um status</option>
                        <option value="Em entrega">Em entrega</option>
                        <option value="Em preparação">Em preparação</option>
                        <option value="Entregue">Entregue</option>
                    </select>
                </div>
                <div className="flex justify-between items-center">
                    <button 
                        className="bg-orange-600 text-white py-2 px-4 rounded-md" 
                        onClick={handleFilterClick}
                    >
                        Filtrar
                    </button>
                    <button 
                        className="text-orange-600" 
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
