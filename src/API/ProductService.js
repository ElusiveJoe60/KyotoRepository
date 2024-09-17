import axios from "axios";

export default class PostService {
    static async getAll() {
        const response = await axios.get("https://dummyjson.com/products");
        return response.data.products;
    }

    static async getProductsByCategory(category) {
        const response = await axios.get(`https://dummyjson.com/products/category/${category}`)
        return response.data.products;
    }

    static async getSelectedProduct(id) {
        const response = await axios.get(`https://dummyjson.com/products/${id}`)
        return response.data;
    }
}