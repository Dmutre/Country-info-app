# Country Info Application

A NestJS application that provides information about countries, including population data, flags, borders, and holiday information. The application integrates with multiple external APIs to gather comprehensive country data.

## Features

- Get information about countries (population, borders, flags)
- View and manage country-specific holidays
- User-specific calendar events
- Swagger API documentation
- TypeScript support
- PostgreSQL database integration

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- pnpm package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Dmutre/Country-info-app.git
cd Country-info-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
HOST=0.0.0.0
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=postgres
```

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE postgres;
```

## Running the Application

### Development Mode
```bash
pnpm run start:dev
```

### Production Mode
```bash
pnpm run build
pnpm run start:prod
```

The application will be available at `http://localhost:3000`

## API Documentation

Once the application is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api
```

## API Endpoints

### Countries
- `GET /countries` - Get all countries
- `GET /countries/country-info?iso2=US&iso3=USA` - Get detailed country information
- `POST /countries/:userId/calendar-events` - Add calendar events for a country
- `GET /countries/:userId/calendar-events` - Get calendar events for a user

### Users
- `POST /users` - Create a new user
- `GET /users` - Find a user by ID, email, or username
- `DELETE /users/:id` - Delete a user

## External APIs Used

- [Nager Date API](https://date.nager.at/) - For country holidays and borders
- [Countries Now API](https://countriesnow.space/) - For country population and flags

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
