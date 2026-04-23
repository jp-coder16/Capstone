pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Deploy Containers') {
            steps {
                bat 'docker-compose down || exit 0'
                bat 'docker-compose up -d --build'
            }
        }

        stage('Wait for Services') {
            steps {
                script {
                    bat '''
                    echo Waiting for ML service...
                    :loop1
                    curl -f http://localhost:8000/health && goto done1
                    timeout /t 2 > nul
                    goto loop1
                    :done1

                    echo Waiting for Backend...
                    :loop2
                    curl -f http://localhost:5000 && goto done2
                    timeout /t 2 > nul
                    goto loop2
                    :done2

                    echo Waiting for Frontend...
                    :loop3
                    curl -f http://localhost:3000 && goto done3
                    timeout /t 2 > nul
                    goto loop3
                    :done3
                    '''
                }
            }
        }

        stage('Final Health Check') {
            steps {
                bat '''
                curl -f http://localhost:8000/health || exit 1
                curl -f http://localhost:5000 || exit 1
                curl -f http://localhost:3000 || exit 1
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}