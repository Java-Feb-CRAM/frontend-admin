#!groovy

void setBuildStatus(String message, String state) {
  step([
    $class            : "GitHubCommitStatusSetter",
    reposSource       : [$class: "ManuallyEnteredRepositorySource", url: env.GIT_URL],
    contextSource     : [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
    errorHandlers     : [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
    statusResultSource: [$class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]]]
  ]);
}


pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        setBuildStatus("Build pending", "PENDING")
        echo 'Testing..'
        sh "npm install"
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
          sh "npm run test-headless"
        }
      }
    }
    stage('Build') {
      steps {
        echo 'Building..'
        sh "ng build --prod"
      }
      post {
        always {
          jiraSendBuildInfo site: 'java-feb-cram.atlassian.net'
        }
      }
    }
    stage('Analysis') {
      steps {
        echo 'Analyzing..'
        withSonarQubeEnv('sonarQube') {
          sh "/var/lib/jenkins/sonar-scanner-4.6.0.2311-linux/bin/sonar-scanner"
        }
      }
    }
    stage("Quality Gate") {
      steps {
        timeout(time: 1, unit: 'HOURS') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying..'
        sh "aws s3 cp $WORKSPACE/dist/frontend-admin s3://ut-frontend-admin --recursive --include '*'"

      }
      post {
        always {
          jiraSendDeploymentInfo site: 'java-feb-cram.atlassian.net', environmentId: 'us-prod-1', environmentName: 'us-prod-1', environmentType: 'production'
        }
      }
    }
  }
  post {
    always {
      cleanWs(cleanWhenNotBuilt: false,
        deleteDirs: true,
        disableDeferredWipeout: true,
        notFailBuild: true,
        patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                   [pattern: '.propsfile', type: 'EXCLUDE']])
    }
    success {
      setBuildStatus("Build succeeded", "SUCCESS")
    }
    failure {
      setBuildStatus("Build failed", "FAILURE")
    }
  }
}
