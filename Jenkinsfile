pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/ashcode12/password-manager.git'
            }
        }
        stage('Build Backend') {
            steps {
                sh 'docker build -t password-manager-backend -f Dockerfile.backend .'
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'docker build -t password-manager-frontend -f password-manager-frontend/Dockerfile.frontend .'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'docker run --rm password-manager-backend npm test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/test-results/*.xml', allowEmptyArchive: true
        }
    }
}
