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
                sh '''
                echo "Stopping old containers..."
                docker compose down || true

                echo "Starting containers (NO rebuild)..."
                docker compose up -d
                '''
            }
        }

        stage('Wait for Services') {
            steps {
                sh 'sleep 15'
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                echo "Checking ML service..."
                curl -f http://localhost:8000/health || exit 1

                echo "Checking Backend..."
                curl -f http://localhost:5000 || exit 1

                echo "Checking Frontend..."
                curl -f http://localhost:3000 || exit 1
                '''
            }
        }

        stage('Verify Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful (no rebuild performed)'
        }

        failure {
            echo '❌ Pipeline failed!'
            sh 'docker logs ml || true'
            sh 'docker logs backend || true'
        }
    }
}
