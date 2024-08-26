"use client";

import Sidebar from '../../components/Sidebar';
import TopBar from '@/components/topBar';
import Card from '../../components/Card';
import MetricCard from '../../components/MetricCard';
import SearchBar from '../../components/SearchBar';
import FilterButton from '../../components/FilterButton';
import OrderTable from '../../components/OrderTable';
import { useEffect, useState } from 'react';
import { fetchOrders, fetchOrderCount } from '@/services/OrderService';
import { fetchProducts } from '@/services/ProductService';
import { Order } from '@/types/Order';
import { Product } from '@/types/Product';
import { FaBox, FaClipboardList, FaShoppingBag } from 'react-icons/fa';
import FilterModal from '@/components/FilterModal';

const AdminDashboard: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
    const [filteredData, setFilteredData] = useState<Order[]>([]);
    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchOrders();
                setOrders(data);
                setFilteredData(data);
            } catch (err) {
                setError('Falha ao carregar pedidos');
            }
        };

        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setError('Falha ao carregar produtos');
            }
        };

        loadOrders();
        loadProducts();
    }, []);

    const handleSearch = (query: string) => {
        console.log('Search query:', query);
    };

    const handleFilter = () => {
        setIsFilterModalOpen(true);
    };


    const handleFilterApply = (filters: any) => {
        const { date, status } = filters;

        const filtered = orders.filter(order => {
            const today = new Date();
            const orderDate = new Date(order.date); // Adjust this based on your actual date field
            let dateCondition = true;
    
            switch (date) {
                case '7':
                    dateCondition = (today.getTime() - orderDate.getTime()) / (1000 * 3600 * 24) <= 7;
                    break;
                case '15':
                    dateCondition = (today.getTime() - orderDate.getTime()) / (1000 * 3600 * 24) <= 15;
                    break;
                case '30':
                    dateCondition = (today.getTime() - orderDate.getTime()) / (1000 * 3600 * 24) <= 30;
                    break;
                case '>30':
                    dateCondition = (today.getTime() - orderDate.getTime()) / (1000 * 3600 * 24) > 30;
                    break;
                case 'Todos':
                default:
                    dateCondition = true;
                    break;
            }
    
            const statusCondition = status === '' || order.status === status;
    
            return dateCondition && statusCondition;
        });
    
        setFilteredData(filtered); // Update the state to reflect the filtered data
    };

    const lowStockCount = products.filter(product => product.stockQuantity < product.minimumStockQuantity).length;

    return (
        <div className="flex text-black">
            <Sidebar />

            <div className='flex-1 flex flex-col'>
                <TopBar />

                <main className="w-full p-8 bg-gray-100">
                    <section className="grid grid-cols-3 gap-4 mb-8">
                        <Card title="Pedidos" icon={<FaShoppingBag className='text-orange-600' />} />
                        <Card title="Estoque" icon={<FaBox className='text-green-600' />} />
                        <Card title="Listas Escolares" icon={<FaClipboardList className='text-yellow-400' />} />
                    </section>

                    <section className="grid grid-cols-4 gap-4 mb-8">
                        <MetricCard title="Total Pedidos" value={orders.length} />
                        <MetricCard title="Total Produtos" value={products.length} />
                        <MetricCard title="Estoque Mínimo" value={lowStockCount} />
                        <MetricCard title="Novos Clientes" value={10} />
                    </section>

                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <SearchBar placeholder="Pesquise aqui" onSearch={handleSearch} />
                            <FilterButton onClick={handleFilter} />
                            {isFilterModalOpen && (
                                <FilterModal
                                    onClose={() => setIsFilterModalOpen(false)}
                                    onFilter={handleFilterApply}
                                />
                            )}
                        </div>
                        <OrderTable orders={filteredData} setOrders={setFilteredData} />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
