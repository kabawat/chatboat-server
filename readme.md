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