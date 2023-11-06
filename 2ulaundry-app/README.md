# APP

## Steps to run the app

### 1. Install npm dependencies:

```
npm install
```

### 2. initialize docker

```
docker-compose up -d
```

### 3. setup the db

```
yarn db:push
```


### 4. seed db

```
yarn db:fill
## also you can clean the db with db:clean
```

### 5. Start the app

```
yarn dev
```

## Reference

https://github.com/prisma/blogr-nextjs-prisma 
