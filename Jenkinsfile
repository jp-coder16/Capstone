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
                // Safe Windows delay (replaces timeout)
                bat 'ping 127.0.0.1 -n 16 > nul'
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
            echo '✅ Pipeline completed successfully!'
        }

        failure {
            echo '❌ Pipeline failed'

            // FIXED container names from docker-compose
            bat 'docker logs capstone-ml-1 || exit 0'
            bat 'docker logs capstone-backend-1 || exit 0'
            bat 'docker logs capstone-frontend-1 || exit 0'
        }
    }
}
