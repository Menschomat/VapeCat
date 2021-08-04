#!/usr/bin/env groovy
pipeline {
  agent {
    docker{ image 'electronuserland/builder:wine' }
  }
  stages {
    stage('Initialize') {

      steps {
        sh '''
                echo "Building Vapecat"
                '''
        sh 'npm install'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run electron:build'
      }
      post {
        always {
          archiveArtifacts artifacts: 'release/*.msi, release/*.exe', fingerprint: true
        }
      }
    }
  }
}
