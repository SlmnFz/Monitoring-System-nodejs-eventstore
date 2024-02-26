# Monitoring System

This project is a monitoring system built using Express.js and EventStore. It collects system metrics such as CPU usage, memory usage, disk usage, and network activity, and stores them in EventStore for real-time analysis and monitoring.

## Installation

To run the monitoring system locally, follow these steps:

1.  Clone this repository to your local machine:
```bash
git clone <repository-url>
```

2.  Navigate to the project directory:
```bash
cd <name-of-dir>
```

3.  Install dependencies using npm:
```bash
npm install
```

4. Configure the environment variables by creating a .env file in the root directory of the project. Add the following variables:
```plaintext
PORT=3000
EVENTSTORE_HOST=localhost
EVENTSTORE_PORT=2113
```

5. Start the app:
```bash
npm start
```

6. Access the monitoring system at http://localhost:3000 in your web browser.

# Usage

Once the monitoring system is running, you can access it through the web interface. The system collects various system metrics such as CPU usage, memory usage, disk usage, and network activity in real-time. These metrics are stored in EventStore for analysis and monitoring purposes.

# API Documentation

Explore the API endpoints and their descriptions using the Swagger documentation:
[API Documentation](/api-docs)

# Technologies Used

- Express.js: A web application framework for Node.js used for building the backend server.
- EventStore: A database for managing and storing event streams, used for storing system metrics data.
- Socket.io: A library that enables real-time, bidirectional communication between web clients and servers using WebSockets.
- os-utils: A Node.js library for getting CPU and memory usage information.
- check-disk-space: A Node.js library for getting disk usage information.

# Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create your feature branch: git checkout -b feature-name.
3. Commit your changes: git commit -am 'Add some feature'.
4. Push to the branch: git push origin feature-name.
5. Submit a pull request.

# License

This project is licensed under the MIT License - see the [LICENSE](LICENCE) file for details.