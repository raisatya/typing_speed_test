# Typing Speed Test

A web application to test and improve your typing speed, built with modern web technologies. This project was an excellent opportunity to learn and implement various tools and frameworks.

## Tech Stack

- **Next.js**: React framework for building server-side rendered and statically generated web applications.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Prisma**: ORM (Object-Relational Mapping) tool for seamless database integration.
- **NextAuth**: Authentication for Next.js applications.
- **Vercel**: Deployment platform for frontend frameworks and static sites.

## Key Takeaways

- **Prisma ORM**: Efficiently manage and interact with the database.
- **NextAuth**: Implemented secure and scalable authentication.
- **Monorepos**: Improved project organization and dependency management.

## Features

- Measure and display typing speed in real-time.
- User authentication using NextAuth.
- Responsive design with Tailwind CSS.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/raisatya/typing_speed_test.git
   cd typing_speed_test
   ```

2. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Using yarn:
   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root of the project and add the following variables:

   ```env
   DATABASE_URL=your_database_url
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret
   ```

4. **Prisma setup:**

   Generate Prisma client and run migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Run the development server:**

   Using npm:
   ```bash
   npm run dev
   ```

   Using yarn:
   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application in action.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions or improvements.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Special thanks to the developers of the technologies used in this project.
- Inspiration and code snippets were taken from various tutorials and open-source projects.

---

For more details, check out the [GitHub Repo](https://github.com/raisatya/typing_speed_test---NEXTjs-NextAuth-Prisma-Postgres). Enjoy testing your typing speed! 🚀
