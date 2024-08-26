
interface DeleteOrderModalProps {
  orderId: number;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteOrderModal: React.FC<DeleteOrderModalProps> = ({ orderId, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Excluir pedido</h2>
        <p className="text-gray-700 mb-6">
          Você realmente deseja excluir o pedido? Essa ação não poderá ser desfeita.
        </p>
        <div className="flex justify-between">
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded-full w-full mr-2"
            onClick={onConfirm}
          >
            Sim, excluir
          </button>
          <button
            className="text-orange-500 py-2 px-4 rounded-full w-full"
            onClick={onClose}
          >
            Não excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOrderModal;
