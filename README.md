# Authify Server Structure
A sample server structure with auth module

## ENV
```
NODE_ENV=development
PORT=3001
# Flag to run the server on SSL
APP_SECURE=false
# Security related SSL files
KEY_FILE=
CERT_FILE=
CA_FILES=

## Stack Trace Flag
PRINT_STACK_TRACE=true

## Encrypted Pipe
USE_ENCRYPTED_PIPE=false

## For AES Encryption
ENCRYPTION_KEY=6ddd024f8da5daef49eceabc3d33078a
CRYPTO_ENC_ALGO=aes-256-cbc
SECRET_KEY=ce94a0a68c349b38ad54367e58d8e842
INIT_VECTOR=72b23dd99396fdb8


## For JWT
JWT_SECRET_KEY=0dc1e3356243dc4c
REFRESH_TOKEN_SECRET_KEY=ff471b7122c0c178
OTP_TOKEN_EXP_TIME=5m
AUTH_ACCESS_TOKEN_EXP_TIME=1d
AUTH_REFRESH_TOKEN_EXP_TIME=7d


## DATABASE
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=authify
DATABASE_HOST=127.0.0.1
DATABASE_DIALECT=

## IF INCASE OF MONGODB
DATABASE_URL=

## REDIS IF ANY
## True if the redis server is password protected
REDIS_PASSWORD_PROTECTED=
## True if want to enable the use of redis
REDIS_ENABLE=
```