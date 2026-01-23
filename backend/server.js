import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        // Connect DB first
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        });

        // Graceful shutdown
        const shutdown = () => {
            console.log('Shutting down gracefully...');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        };

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
