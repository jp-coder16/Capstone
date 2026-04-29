pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = '1'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images (Parallel)') {
            parallel {

                stage('Backend Build') {
                    steps {
                        bat 'docker build -t cap-backend ./backend'
                    }
                }

                stage('Frontend Build') {
                    steps {
                        bat 'docker build -t cap-frontend ./frontend'
                    }
                }

                stage('ML Build') {
                    steps {
                        bat 'docker build -t cap-ml ./ml'
                    }
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                bat 'docker-compose down'
                bat 'docker-compose up -d --force-recreate'
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
                echo Checking ML...
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
            echo '❌ Pipeline failed!'
            bat 'docker logs ml || true'
            bat 'docker logs backend || true'
        }
    }
}
