const alias = require("esbuild-plugin-alias");

const isProd = process.env.NODE_ENV === "production";

require("esbuild")
  .build({
    entryPoints: ["./worker"],
    bundle: true,
    sourcemap: true,
    minify: isProd,
    outdir: "dist",
    define: {
      "process.env.NODE_ENV": `"${process.env.NODE_ENV ?? "development"}"`,
      "process.env.DATABASE_URL": `"${process.env.DATABASE_URL ?? ""}"`,
    },
    plugins: [
      alias({
        "@prisma/client": require.resolve("@prisma/client"),
      }),
    ],
  })
  .catch(() => process.exit(1));
