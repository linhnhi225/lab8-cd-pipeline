pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'linhnhi225/devops-lab8-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
        CONTAINER_NAME = 'lab8-cd-production'
        APP_PORT = '3002'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'STEP 1: Checkout source code'
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                echo 'STEP 2: Build Docker image'
                sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
            }
        }

        stage('Docker Scan') {
            steps {
                echo 'STEP 3: Docker image scan (optional)'
                echo 'Docker Scout scan can be added here'
            }
        }

        stage('Push to Registry') {
            steps {
                echo 'STEP 4: Push image to Docker Hub'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-hub-credentials_1',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        docker push $DOCKER_IMAGE:$DOCKER_TAG
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'STEP 5: Deploy container'

                sh '''
                    docker rm -f $CONTAINER_NAME || true

                    docker run -d \
                        --name $CONTAINER_NAME \
                        -p $APP_PORT:3000 \
                        --restart unless-stopped \
                        $DOCKER_IMAGE:$DOCKER_TAG
                '''
            }
        }

        stage('Verify Deploy') {
            steps {
                echo 'STEP 6: Verify application'

                sh '''
                    sleep 5
                    curl -f http://host.docker.internal:3002/health
                    curl -f http://host.docker.internal:3002/
                '''
            }
        }
    }

    post {
        success {
            echo "CD PIPELINE SUCCESS: $DOCKER_IMAGE:$DOCKER_TAG"
        }

        failure {
            echo 'CD PIPELINE FAILED - Check Console Output'
        }
    }
}
