import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import glsl from 'vite-plugin-glsl';

// WebSocket 서버 생성 함수
// WebSocket 서버 생성 함수
const createWebSocketServer = () => {
  const server = createServer();
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
      console.log(`Received: ${message}`);
      // 모든 클라이언트에게 메시지 브로드캐스트
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    ws.send('Welcome to the WebSocket server!');
  });

  server.listen(8080, () => {
    console.log('WebSocket server is running on ws://localhost:8080');
  });
};


export default defineConfig({
  plugins: [react(), svgr(), glsl(),
    {
      name: 'configure-server',
      configureServer(server) {
        // Vite 개발 서버에 WebSocket 서버 추가
        createWebSocketServer(server.httpServer);
      },
    },
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://ec2-43-203-242-73.ap-northeast-2.compute.amazonaws.com:3000/', // 백엔드 서버 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets/weatherAsset': path.resolve(__dirname, 'src/assets/weatherAssets'),
      '@img': path.resolve(__dirname, 'src/img')
    }
  }
}); 