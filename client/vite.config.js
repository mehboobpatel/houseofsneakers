const path = require('path');
import reactRefresh from '@vitejs/plugin-react-refresh'

export default {
  plugins: [reactRefresh()],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  resolve: {
    alias: {
      // You can add more alias for the common directories used in your project
      "@": path.resolve(__dirname, "src")
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/main.jsx")
      }
    }
  }
}
