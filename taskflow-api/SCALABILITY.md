# TaskFlow API — Scalability Notes

## Current Architecture

```
Client (Browser)
     │
     ▼
Express.js API (Node.js)
     │
     ├── In-Memory Store (demo) → PostgreSQL (production)
     └── JWT Auth (stateless)
```

## Scaling Strategy

### 1. Horizontal Scaling (Stateless API)
Since JWT is stateless, multiple API instances can run behind a load balancer without session stickiness.

```
                    ┌─────────────────┐
Client ──▶ Nginx ──▶│  API Instance 1│─┐
Load Balancer       │  API Instance 2 │ ├──▶ PostgreSQL (Primary)
                    │  API Instance 3 │─┘         │
                    └─────────────────┘    PostgreSQL (Read Replicas)
```

### 2. Caching with Redis
- Cache frequently-read task lists per user (TTL: 60s)
- Cache admin stats (TTL: 5min)
- Blacklist revoked JWT tokens

```javascript
// Example Redis caching pattern
const cacheKey = `tasks:user:${userId}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);
const tasks = await db.query(...);
await redis.setex(cacheKey, 60, JSON.stringify(tasks));
```

### 3. Database Scaling
- **Read replicas** for GET-heavy workloads
- **Connection pooling** via `pg-pool` (already configured)
- **Indexing**: `users.email`, `tasks.user_id`, `tasks.status`
- **Partitioning**: tasks table by `created_at` for large datasets

### 4. Microservices Path (future)
Split into independent services when team/load grows:
- `auth-service` — registration, login, JWT issuance
- `task-service` — CRUD operations
- `notification-service` — due date reminders (event-driven)
- `admin-service` — reporting, user management

Communication: REST or message queue (RabbitMQ/Kafka)

### 5. API Gateway
Use Kong or AWS API Gateway for:
- Rate limiting per user/IP
- Request routing
- SSL termination
- API key management

### 6. Deployment Options
| Option | Best For |
|--------|----------|
| Docker Compose | Local dev / small teams |
| Kubernetes | Large-scale production |
| AWS ECS + RDS | Managed cloud deployment |
| Railway / Render | Quick zero-config deploy |

### 7. Performance Targets (with these optimizations)
- **Current (demo):** ~1,000 req/s single instance
- **With Redis caching:** ~5,000 req/s
- **With horizontal scaling (3 nodes):** ~15,000 req/s
- **With read replicas:** Handles 100k+ concurrent users

## Security Checklist
- [x] Passwords hashed with bcrypt (salt rounds: 12)
- [x] JWT with expiry (7 days, configurable)
- [x] Input sanitization via express-validator
- [x] Helmet.js security headers
- [x] CORS whitelist
- [x] SQL injection protection (parameterized queries)
- [ ] Rate limiting (add express-rate-limit)
- [ ] JWT refresh tokens
- [ ] HTTPS enforcement in production
