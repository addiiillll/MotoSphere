import { sseManager } from '../utils/sseManager.js';

// SSE endpoint for notifications
export const subscribeToNotifications = async (req, res) => {
    const userId = req.user._id;

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable buffering for nginx

    // Send initial connection message
    res.write(`data: ${JSON.stringify({ type: 'connected', message: 'Connected to notifications' })}\n\n`);

    // Add client to SSE manager
    sseManager.addClient(userId, res);

    // Handle client disconnect
    req.on('close', () => {
        sseManager.removeClient(userId);
    });

    req.on('end', () => {
        sseManager.removeClient(userId);
    });

    // Keep connection alive with heartbeat
    const heartbeat = setInterval(() => {
        res.write(`:heartbeat\n\n`);
    }, 30000); // Every 30 seconds

    req.on('close', () => {
        clearInterval(heartbeat);
    });
};

// Send notification to specific user
export const sendNotificationToUser = (userId, notification) => {
    return sseManager.sendNotification(userId, notification);
};

// Get active SSE connections count
export const getActiveConnections = (req, res) => {
    res.json({
        success: true,
        activeConnections: sseManager.getActiveConnections()
    });
};
