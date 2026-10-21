# This is a basic template for a backend project
Read me will be updated occasionally

### Required authentication configuration

Set `JWT_SECRET` to a strong, unique private value before starting this server or running authentication tests. Copy `.env.example` to a local `.env` when using dotenv, or configure the value in the hosting secret store. Startup fails when the value is absent or blank. Revoke any previously committed provider credentials; rotate the signing key and invalidate old sessions before reusing a deployment that used the old fallback.
