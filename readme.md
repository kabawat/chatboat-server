create .env file 

PORT=2917


project-root/

│───src/
│    │
│    ├───db/
│    │   ├───models/                            # Directory for defining database models
│    │   │   ├───user.js                        # Example: User model
│    │   │   └───...
│    │   └───...
│    │   
│    │
│    ├───config/                                # Directory for configuration files
│    │   ├───databaseConfig.js                  # Database configuration file
│    │   └───...
│    │
│    ├───controllers/                           # Directory for controllers handling business logic
│    │   ├───user.js                            # Example: Controller for user-related operations
│    │   └───...
│    │
│    ├───routes/                                # Directory for defining routes
│    │   ├───userRoutes.js                      # Example: Routes related to user management
│    │   └───...
│    │
│    ├───middlewares/                           # Directory for middleware functions
│    │  
│    │
│    ├───services/                              # Directory for services encapsulating business logic
│    │   ├───index.js                           # Example: Service for user-related operations
│    │   └───...
│    │
│    └───...
│
│───index.js                                    # Entry point of the application
│───.env 
│───package.json                                # npm package metadata
│───README.md                                   # Documentation about your project
│───jsconfig.json                               # JS config for VS Code (optional)
│───.gitignore                                  # Specifies ignored files in git
│───LICENSE                                     # License information for your project
└───...

<!-- create -->
PORT=2917
ENVIRONMENT=dev
MONGODB_URI_DEV=mongodb://0.0.0.0:27017
MONGODB_URI=mongodb://0.0.0.0:27017

JWT_AUTH_SECRET=23l4k2l3k4j2o039lk24lj
JWT_ACCESS_SECRET=kljlk2j43lkjl4098f989
JWT_ACCESS_PASSWORD=laskdjfoisfuaosij23jk4

<!-- cloudnary -->
CLOUD_NAME=<cloud name>
API_KEY=<api key>
API_SECRET=<API secret>

GMAIL_USER=<Your email id>
GMAIL_PASS=<App password>

WEBHOOK_URL=https://hooks.slack.com/services/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
SERVER_URL=http://localhost:2917