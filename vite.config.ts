import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }) as PluginOption,
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: "css",
        }),
      ],
    }),
  ],
  server: {
    port: 8000,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    // 调整 chunk 大小警告限制
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 自定义 chunk 分割策略
        manualChunks: {
          // 将 React 相关库打包到一起
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // 将 Ant Design 相关库打包到一起
          "antd-vendor": ["antd", "@ant-design/icons"],
          // 将其他第三方库打包到一起
          vendor: ["axios", "ahooks"],
        },
        // 自定义 chunk 文件名
        chunkFileNames: (chunkInfo) => {
          const prefix = chunkInfo.name.includes("vendor")
            ? "vendor"
            : "modules";
          return `js/${prefix}/[name]-[hash].js`;
        },
        // 入口文件名
        entryFileNames: "js/[name]-[hash].js",
        // 资源文件名
        assetFileNames: "[ext]/[name]-[hash].[ext]",
      },
    },
    // 启用压缩
    minify: "terser",
    terserOptions: {
      compress: {
        // 生产环境移除 console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
