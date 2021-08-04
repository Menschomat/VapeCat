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
        sh 'sudo chown -R 1000:998 "/.npm"'
        sh 'npm install'

      }
    }
    stage('Build') {
      steps {
        sh 'npm run electron:build'
      }

      //post {
      //  always {
      //   archiveArtifacts artifacts: 'target/*.jar, target/*.exe', fingerprint: true
      // junit 'target/surefire-reports/**/*.xml'
      // }
      //}
    }
  }
}
