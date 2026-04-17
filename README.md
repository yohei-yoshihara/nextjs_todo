# Next.JS 16 + Prisma 7 Todo

[こちら](https://nextjs.org/learn)を参考にして作成してみた Todo アプリ。

![スクリーンショット 2024-10-17 19 16 34](https://github.com/user-attachments/assets/d3ef546b-ed6c-4fbd-bfb2-5a3d43c80814)

## 起動手順

``` bash
cd nextjs_todo
pnpm install
pnpm dlx auth secret
pnpm dlx prisma generate
pnpm dlx prisma db push
pnpm dlx tsx seed.ts
pnpm run dev
```

## 新規 Next.js 16 + Prisma 7 アプリの作成手順

``` bash
pnpm create next-app@latest nextjs16_todo --yes
cd nextjs16_todo
pnpm add prisma @types/node @types/better-sqlite3 -D
pnpm add @prisma/client @prisma/adapter-better-sqlite3 dotenv
pnpm pkg set "pnpm.onlyBuiltDependencies[]=better-sqlite3"
pnpm install
pnpm add jose zod react-icons bcryptjs dayjs 

pnpm dlx prisma init --datasource-provider sqlite --output ../generated/prisma
pnpm dlx prisma migrate dev --name init
pnpm dlx prisma generate
```
