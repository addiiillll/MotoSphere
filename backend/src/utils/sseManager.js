// SSE Connection Manager
class SSEManager {
    constructor() {
        this.clients = new Map(); // userId -> response object
    }

    addClient(userId, res) {
        this.clients.set(userId.toString(), res);
    
    }

    removeClient(userId) {
        this.clients.delete(userId.toString());

    }

    sendNotification(userId, notification) {
        const client = this.clients.get(userId.toString());
        if (client) {
            try {
                client.write(`data: ${JSON.stringify(notification)}\n\n`);
                return true;
            } catch (error) {
                console.error(`Error sending notification to ${userId}:`, error);
                this.removeClient(userId);
                return false;
            }
        }
        return false;
    }

    broadcast(notification) {
        let sent = 0;
        this.clients.forEach((client, userId) => {
            if (this.sendNotification(userId, notification)) {
                sent++;
            }
        });
        return sent;
    }

    getActiveConnections() {
        return this.clients.size;
    }
}

export const sseManager = new SSEManager();
