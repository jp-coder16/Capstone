pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy Containers') {
            steps {
                bat '''
                echo Stopping old containers...
                docker compose down || exit 0

                echo Starting containers...
                docker compose up -d
                '''
            }
        }

        stage('Wait for Services') {
            steps {
                bat 'timeout /t 15'
            }
        }

        stage('Health Check') {
            steps {
                bat '''
                echo Checking ML service...
                curl -f http://localhost:8000/health || exit 1

                echo Checking Backend...
                curl -f http://localhost:5000 || exit 1

                echo Checking Frontend...
                curl -f http://localhost:3000 || exit 1
                '''
            }
        }

        stage('Verify Containers') {
            steps {
                bat 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful'
        }

        failure {
            echo '❌ Pipeline failed'
            bat 'docker logs ml || exit 0'
            bat 'docker logs backend || exit 0'
        }
    }
}
