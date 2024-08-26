import { Product } from "@/types/Product";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";


export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axiosInstance.get<Product[]>('/Product');
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Falha ao buscar os pedidos. Por favor, tente novamente.');
        } else {
            throw new Error('Ocorreu um erro inesperado.');
        }
    }
}