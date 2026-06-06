import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포 시, 레포 이름으로 base 경로를 설정해야 합니다.
  // 예: 레포 이름이 'prd-generator'이면 '/prd-generator/'
  // GitHub Pages에서 username.github.io 커스텀 도메인을 쓰면 '/'로 변경하세요.
  base: '/prd/',
})
