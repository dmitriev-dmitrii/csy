import {env} from "../../constants/env.js";

const {WG_API_PORT} = env

const WG_API_URL = `http://localhost:${WG_API_PORT}`;

export const wgService = {

    getWgStatus: async ()=> {
        try {
            const response = await fetch(`${WG_API_URL}/status`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching WireGuard status:', error);
        }
    },

    getWgClients: async ()=> {
        try {
            const response = await fetch(`${WG_API_URL}/clients`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching WireGuard clients:', error);
        }
    },

    createWgClient : async  (userId)=> {
        try {
            const response = await fetch(`${WG_API_URL}/clients`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: userId })
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding WireGuard client:', error);
        }
    }
};