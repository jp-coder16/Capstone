pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Deploy') {
            steps {
                bat 'docker-compose down'
                bat 'docker-compose up --build'   // 🔥 NO -d → show logs
            }
        }

        stage('Verify Containers') {
            steps {
                bat 'docker ps'
            }
        }

        stage('Health Check (Safe)') {
            steps {
                script {
                    bat '''
                    set count=0

                    echo Checking ML service...
                    :loop1
                    curl -f http://localhost:8000/health && goto done1
                    timeout /t 2 > nul
                    set /a count+=1
                    if %count%==10 exit 1
                    goto loop1
                    :done1

                    set count=0
                    echo Checking Backend...
                    :loop2
                    curl -f http://localhost:5000 && goto done2
                    timeout /t 2 > nul
                    set /a count+=1
                    if %count%==10 exit 1
                    goto loop2
                    :done2

                    set count=0
                    echo Checking Frontend...
                    :loop3
                    curl -f http://localhost:3000 && goto done3
                    timeout /t 2 > nul
                    set /a count+=1
                    if %count%==10 exit 1
                    goto loop3
                    :done3
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed! Check logs above.'
        }
    }
}