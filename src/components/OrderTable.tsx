import { Order } from '@/types/Order';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import DeleteOrderModal from './DeleteOrderModal';
import { deleteOrder } from '@/services/OrderService';

interface OrderTableProps {
    orders: Order[];
    setOrders: (orders: Order[]) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, setOrders }) => {
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteClick = (orderId: number) => {
        setSelectedOrderId(orderId);
    };

    const handleConfirmDelete = async () => {
        if (selectedOrderId) {
          try {
            await deleteOrder(selectedOrderId);
            setOrders(orders.filter(order => order.id !== selectedOrderId));
            setSelectedOrderId(null);
          } catch (err) {
            setError('Failed to delete the order');
          }
        }
      };


    return (
        <>
            <table className="min-w-full bg-white shadow rounded">
                <thead>
                    <tr>
                        <th className="py-2 px-4">Núm. Pedido</th>
                        <th className="py-2 px-4">Valor</th>
                        <th className="py-2 px-4">Data</th>
                        <th className="py-2 px-4">Forma de pagamento</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="py-2 px-4 text-center">{order.id}</td>
                            <td className="py-2 px-4 text-center">{order.totalAmount}</td>
                            <td className="py-2 px-4 text-center"> {new Date(order.orderDate).toLocaleDateString()}</td>
                            <td className="py-2 px-4 text-center">{order.paymentMethod}</td>
                            <td className="py-2 px-4 text-center">{order.status}</td>
                            <td className="py-2 px-4 flex text-center items-center justify-center">
                                {order.status !== '' && (
                                    <FaTrash
                                        className="text-black cursor-pointer"
                                        onClick={() => handleDeleteClick(order.id)}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedOrderId && (
                <DeleteOrderModal
                    orderId={selectedOrderId}
                    onClose={() => setSelectedOrderId(null)}
                    onConfirm={() => {
                        handleConfirmDelete();
                        console.log('Order deleted:', selectedOrderId);
                        setSelectedOrderId(null);
                    }}
                />
            )}
        </>

    );
};

export default OrderTable;
