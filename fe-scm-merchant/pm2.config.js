

module.exports = {
    apps: [
      {
        name: "app-prod",
        script: "index.js",
        instances: 0,
        exec_mode: "cluster",
        max_memory_restart: "1024M",
        env: {
          "NODE_ENV": "prod"
        },
        error_file: "logs/pm2-log/err.log",
        out_file: "logs/pm2-log/out.log",
        merge_logs: true,
        log_date_format: "YYYY-MM-DD HH:mm Z"
      },
      {
        name: "app-staging",
        script: "index.js",
        instances: 0,
        exec_mode: "cluster",
        max_memory_restart: "1024M",
        env: {
          "NODE_ENV": "staging"
        },
        error_file: "logs/pm2-log/err.log",
        out_file: "logs/pm2-log/out.log",
        merge_logs: true,
        log_date_format: "YYYY-MM-DD HH:mm Z"
      },
      {
        name: "app-test",
        script: "index.js",
        instances: 0,
        exec_mode: "cluster",
        max_memory_restart: "1024M",
        env: {
          "NODE_ENV": "test"
        },
        error_file: "logs/pm2-log/err.log",
        out_file: "logs/pm2-log/out.log",
        merge_logs: true,
        log_date_format: "YYYY-MM-DD HH:mm Z"
      },
      {
        name: "app-beta",
        script: "index.js",
        instances: 0,
        exec_mode: "cluster",
        max_memory_restart: "1024M",
        env: {
          "NODE_ENV": "beta"
        },
        error_file: "logs/pm2-log/err.log",
        out_file: "logs/pm2-log/out.log",
        merge_logs: true,
        log_date_format: "YYYY-MM-DD HH:mm Z"
      },
      {
        name: "app-dev",
        script: "index.js",
        instances: 4,
        exec_mode: "cluster",
        max_memory_restart: "1024M",
        env: {
          "NODE_ENV": "dev"
        },
        error_file: "logs/pm2-log/err.log",
        out_file: "logs/pm2-log/out.log",
        merge_logs: true,
        log_date_format: "YYYY-MM-DD HH:mm Z"
      },
      {
        name: "app-local",
        script: "index.js",
        instances: 1,
        exec_mode: "cluster",
        watch: ["server/controller", "server/middleware", "server/service", "server/views", "server/router.js", "server/app.js"],
        ignore_watch: ["node_modules"],
        max_memory_restart: "1024M",
        env: {
          "NODE_ENV": "local"
        },

        error_file: "logs/pm2-log/err.log",
        out_file: "logs/pm2-log/out.log",
        merge_logs: true,
        log_date_format: "YYYY-MM-DD HH:mm Z"
      }
    ]
  }
            