# Tiklakur - Multi-Tenant SaaS Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green.svg)](https://spring.io/projects/spring-boot)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.x-black.svg)](https://nextjs.org/)

## 🚀 Project Overview

Tiklakur is a comprehensive multi-tenant SaaS platform that allows users to purchase website templates and get their own branded subdomain. Users can select from various templates, make purchases, and instantly get their website accessible via a custom subdomain (e.g., `example.tiklakur.com`).

### Key Features

- **Template Marketplace**: Browse and purchase website templates
- **Multi-Tenant Architecture**: Each user gets their own subdomain
- **Admin Panel**: Comprehensive dashboard for managing templates and users
- **Custom Request System**: Users can request custom development services
- **Payment Integration**: Secure payment processing with iyzico
- **Real-time Monitoring**: Grafana, Loki, and Promtail for observability

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Landing Page  │    │   Admin Panel   │    │  Tenant Router  │
│   (Next.js)     │    │   (React/Vite)  │    │   (Express.js)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Backend APIs  │
                    │   (Spring Boot) │
                    └─────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   PostgreSQL    │    │    MongoDB      │    │     Redis       │
│   (Orders)      │    │   (Auth/Data)  │    │   (Caching)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Technology Stack

### Frontend
- **Landing Page**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Admin Panel**: React 18, Vite, Material-UI, TypeScript
- **UI Components**: Radix UI, Framer Motion, React Hook Form

### Backend
- **Authentication Service**: Spring Boot, Spring Security
- **Order Service**: Spring Boot, Spring Data JPA
- **API Gateway**: Express.js (Tenant Router)
- **Payment Integration**: iyzico

### Databases
- **PostgreSQL**: Order management and user data
- **MongoDB**: Authentication and application data
- **Redis**: Caching and session management

### Infrastructure
- **Message Broker**: Apache Kafka
- **Monitoring**: Grafana, Loki, Promtail
- **Containerization**: Docker Compose
- **Process Management**: PM2

## 📁 Project Structure

```
tiklakur/
├── admin-panel/          # React admin dashboard
├── client/              # Next.js landing page
├── backend/             # Spring Boot microservices
│   ├── auth/           # Authentication service
│   ├── order/          # Order management service
│   ├── special_request/ # Custom request service
│   ├── template/       # Template management
│   └── parent/         # Common dependencies
├── tenant-router/       # Express.js subdomain router
│   ├── server/         # Router server
│   ├── portfolio/      # Portfolio template
│   ├── project1/       # Template 1
│   └── project2/       # Template 2
└── compose/            # Docker Compose configurations
    ├── mongodb.yaml
    ├── kafka.yaml
    └── grafana-loki-promtail/
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x
- Java 17+
- Docker & Docker Compose
- Maven 3.8+

### 1. Clone the Repository

```bash
git clone https://github.com/OmBayus/tiklakur.git
cd tiklakur
```

### 2. Start Infrastructure Services

```bash
# Start MongoDB
docker-compose -f compose/mongodb.yaml up -d

# Start Kafka
docker-compose -f compose/kafka.yaml up -d

# Start Monitoring Stack
docker-compose -f compose/grafana-loki-promtail/docker-compose.yml up -d
```

### 3. Start Backend Services

```bash
# Build parent project
cd backend/parent
mvn clean install

# Start Auth Service
cd ../auth
mvn spring-boot:run

# Start Order Service
cd ../order
mvn spring-boot:run
```

### 4. Start Frontend Applications

```bash
# Start Landing Page
cd client
npm install
npm run dev

# Start Admin Panel
cd ../admin-panel
npm install
npm run dev

# Start Tenant Router
cd ../tenant-router/server
npm install
npm start
```

## 🔧 Configuration

### Environment Variables

Create `.env` files in each service directory:

#### Backend Services
```env
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/tiklakur
SPRING_DATA_MONGODB_URI=mongodb://localhost:27017/tiklakur

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Kafka
KAFKA_BOOTSTRAP_SERVERS=localhost:9092

# JWT
JWT_SECRET=your-jwt-secret
```

#### Frontend Services
```env
# API Endpoints
NEXT_PUBLIC_API_URL=http://localhost:8080
VITE_API_URL=http://localhost:8080
```

## 📊 Monitoring

### Grafana Dashboard
- **URL**: http://localhost:3000
- **Username**: admin
- **Password**: admin

### Kafka UI
- **URL**: http://localhost:8080

### MongoDB Express
- **URL**: http://localhost:8081

## 🏗️ Development

### Adding New Templates

1. Create a new directory in `tenant-router/`
2. Build your template using React/Next.js
3. Add the template configuration to `users.json`
4. Update the tenant router to serve the new template

### Microservice Development

Each Spring Boot service follows a standard structure:
```
src/
├── main/
│   ├── java/
│   │   └── com/tiklakur/
│   │       ├── controller/
│   │       ├── service/
│   │       ├── repository/
│   │       └── model/
│   └── resources/
│       └── application.yml
```

## 🤝 Contributing

### Team Members

- **@OmBayus** - Omer Bayramcavus
- **@brkybzkrt** - Ahmet Berkay Bozkurt  
- **@bahadiracnr** - Bahadır Acuner

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation in each service directory

---

**Built with ❤️ by the Tiklakur Team**
