import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5174,
  },
  // resolve: {
  //   alias: {
  //     "@img": path.resolve(__dirname, "./src/assets/img"),
  //     "@font": path.resolve(__dirname, "./src/assets/fonts"),
  //     "@css": path.resolve(__dirname, "./src/assets/css"),
  //     "@svg": path.resolve(__dirname, "./src/assets/svg"),
  //   },
  // },
  
  plugins: [react()],
});
// export default {
//     server: {
//       host: '15.2.2.13',
//       port:5173
//     },
//   };