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
<<<<<<< HEAD
                        bat 'docker build -t cap-backend ./backend'
=======
                        sh 'docker build -t cap-backend ./backend'
>>>>>>> 5ab8f1e (refactor: implement parallel multi-stage Docker builds and improve deployment health checks in Jenkinsfile)
                    }
                }

                stage('Frontend Build') {
                    steps {
<<<<<<< HEAD
                        bat 'docker build -t cap-frontend ./frontend'
=======
                        sh 'docker build -t cap-frontend ./frontend'
>>>>>>> 5ab8f1e (refactor: implement parallel multi-stage Docker builds and improve deployment health checks in Jenkinsfile)
                    }
                }

                stage('ML Build') {
                    steps {
<<<<<<< HEAD
                        bat 'docker build -t cap-ml ./ml'
=======
                        sh 'docker build -t cap-ml ./ml'
>>>>>>> 5ab8f1e (refactor: implement parallel multi-stage Docker builds and improve deployment health checks in Jenkinsfile)
                    }
                }
            }
        }

        stage('Deploy Containers') {
            steps {
<<<<<<< HEAD
                bat 'docker-compose down'
                bat 'docker-compose up -d --force-recreate'
=======
                sh 'docker compose down || docker-compose down'
                sh 'docker compose up -d --force-recreate || docker-compose up -d --force-recreate'
>>>>>>> 5ab8f1e (refactor: implement parallel multi-stage Docker builds and improve deployment health checks in Jenkinsfile)
            }
        }

        stage('Wait for Services') {
            steps {
<<<<<<< HEAD
                bat 'timeout /t 15'
=======
                sh 'sleep 15'
>>>>>>> 5ab8f1e (refactor: implement parallel multi-stage Docker builds and improve deployment health checks in Jenkinsfile)
            }
        }

        stage('Health Check') {
            steps {
<<<<<<< HEAD
                bat '''
                echo Checking ML...
                curl -f http://localhost:8000/health || exit 1

                echo Checking Backend...
                curl -f http://localhost:5000 || exit 1

                echo Checking Frontend...
=======
                sh '''
                echo "Checking ML service..."
                curl -f http://localhost:8000/health || exit 1

                echo "Checking Backend..."
                curl -f http://localhost:5000 || exit 1

                echo "Checking Frontend..."
>>>>>>> 5ab8f1e (refactor: implement parallel multi-stage Docker builds and improve deployment health checks in Jenkinsfile)
                curl -f http://localhost:3000 || exit 1
                '''
            }
        }

        stage('Verify Containers') {
            steps {
<<<<<<< HEAD
                bat 'docker ps'
=======
                sh 'docker ps'
>>>>>>> 5ab8f1e (refactor: implement parallel multi-stage Docker builds and improve deployment health checks in Jenkinsfile)
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }

        failure {
            echo '❌ Pipeline failed!'
<<<<<<< HEAD
            bat 'docker logs ml || true'
            bat 'docker logs backend || true'
=======
            sh 'docker logs ml || true'
            sh 'docker logs backend || true'
>>>>>>> 5ab8f1e (refactor: implement parallel multi-stage Docker builds and improve deployment health checks in Jenkinsfile)
        }
    }
}