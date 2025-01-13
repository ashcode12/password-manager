pipeline {
    agent any
    environment {
        // Add Node.js and npm paths to the environment
        PATH = "/opt/homebrew/bin:$PATH"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            parallel {
                stage('Backend Dependencies') {
                    steps {
                        dir('src') {
                            sh 'npm install'
                        }
                    }
                }
                stage('Frontend Dependencies') {
                    steps {
                        dir('password-manager-frontend') {
                            sh 'npm install'
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
                            sh 'npm test'
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir('password-manager-frontend') {
                            sh 'npm test'
                        }
                    }
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('password-manager-frontend') {
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deployment logic goes here'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: '**/build/**'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
