pipeline {
    agent any

    environment {
        NODE_VERSION = "14.x"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
                echo "Code successfully checked out from ${env.GIT_BRANCH}"
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Backend Dependencies') {
                    steps {
                        dir('src') {
                            sh '''
                            echo "Installing backend dependencies..."
                            npm install
                            '''
                        }
                    }
                }
                stage('Frontend Dependencies') {
                    steps {
                        dir('password-manager-frontend') {
                            sh '''
                            echo "Installing frontend dependencies..."
                            npm install
                            '''
                        }
                    }
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir('src') {
                            sh '''
                            echo "Running backend tests..."
                            npm test
                            '''
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir('password-manager-frontend') {
                            sh '''
                            echo "Running frontend tests..."
                            npm test
                            '''
                        }
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('password-manager-frontend') {
                    sh '''
                    echo "Building frontend..."
                    npm run build
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deployment step placeholder"
                // Add deployment steps here
            }
        }
    }

    post {
        always {
            echo "Pipeline execution complete."
        }
        failure {
            echo "Pipeline failed. Check the logs for details."
        }
    }
}
