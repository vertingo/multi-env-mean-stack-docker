module.exports = {
    apps: [
      {
        name: "API_SERVER",
        script: "./server.js",
        instances: process.env.INSTANCES_NUM,
        max_memory_restart: "300M",
  
        // Logging
        out_file: "./log/out.log",
        error_file: "./log/error.log",
        merge_logs: true,
        log_date_format: "DD-MM HH:mm:ss Z",
        log_type: "json",
  
        // Env Specific Config
        env_production: {
          NODE_ENV: process.env.NODE_ENV,
          PORT: process.env.BACKEND_PORT,
          exec_mode: "cluster_mode",
        },
        env_development: {
          NODE_ENV: process.env.NODE_ENV,
          PORT: process.env.BACKEND_PORT,
          watch: true,
          watch_delay: 3000,
          ignore_watch: [
            "./node_modules",
            "./app/views",
            "./public",
            "./.DS_Store",
            "./package.json",
            "./yarn.lock",
            "./samples",
            "./src"
          ],
        },
      },
    ],
  };