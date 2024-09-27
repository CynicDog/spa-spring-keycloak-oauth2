import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({ base: "/spa-spring-keycloak-oauth2", plugins: [react()], })