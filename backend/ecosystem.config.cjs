/**
 * PM2 — déploiement production (sans Docker)
 * Usage: pm2 start ecosystem.config.cjs --env production
 */
module.exports = {
  apps: [
    {
      name: "edith-blog-api",
      script: "server.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      // Charge les variables depuis un fichier .env à la racine de backend
      node_args: "--enable-source-maps",
    },
  ],
};
