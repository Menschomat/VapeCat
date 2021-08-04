#!/usr/bin/env groovy
pipeline {
  agent {
    label "electron-wine"
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

      //post {
      //  always {
      //   archiveArtifacts artifacts: 'target/*.jar, target/*.exe', fingerprint: true
      // junit 'target/surefire-reports/**/*.xml'
      // }
      //}
    }
  }
}
