# Aum Patel Portfolio

An interactive 3D portfolio website showcasing professional experience and academic projects with modern animations.

## Features

- Interactive 3D elements built with Three.js
- Responsive design for all device sizes
- Smooth animations using Framer Motion
- Custom cursor and scroll reveal effects
- Contact form with database storage
- Page visit analytics

## Tech Stack

- **Frontend**: React, Three.js, Framer Motion, TailwindCSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: GitHub Pages / Vercel / Netlify

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL database

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/AumPatel001/portfolio-cloud.git
   cd portfolio-cloud
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a .env file with your PostgreSQL database URL
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/portfolio
   ```

4. Push database schema
   ```bash
   npm run db:push
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

## Deployment

This portfolio can be deployed to any hosting service that supports Node.js applications.

### Environment Variables

Make sure to set the following environment variables in your deployment environment:

- `DATABASE_URL`: Your PostgreSQL database connection string

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Aum Patel - [patelaum37@gmail.com](mailto:patelaum37@gmail.com)

Project Link: [https://github.com/AumPatel001/portfolio-cloud](https://github.com/AumPatel001/portfolio-cloud)