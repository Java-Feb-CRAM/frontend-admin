void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: env.GIT_URL],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}


pipeline {
    agent any
    // tools {
    //   maven 'Maven 3.8.1'
    //   jdk 'Java 15'
    // }
    stages {
      // stage('Test') {
      //   steps {
      //     setBuildStatus("Build pending", "PENDING")
      //     echo 'Testing..'
      //     script {
      //       sh "mvn -s /var/lib/jenkins/settings.xml test"
      //     }
      //   }
      // }
        stage('Build') {
            steps {
                echo 'Building..'
                sh "npm install"
                sh "ng build --prod"
            }
        }
        stage('Deploy') {
           steps {
             echo 'Deploying..'
               sh "aws s3 cp $WORKSPACE/dist/frontend-admin s3://ut-frontend-admin --recursive --include "*""
               
           }
        }
        // stage('Cleanup') {
        //     steps {
        //       echo 'Cleaning up..'
        //         sh "docker system prune -f"
        //     }
        // }
    }
    post {
      success {
        setBuildStatus("Build succeeded", "SUCCESS")
      }
      failure {
        setBuildStatus("Build failed", "FAILURE")
      }
    }
}