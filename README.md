# OVERVIEW

[Demo App in this blog!](https://dev.to/paprikamah/how-to-use-amazon-cognito-with-reacttypescript-4elj)

If you wanna know details, please go to the link!

## Quick Setup

### Prerequisite

-   Amazon Cognito is created with AWS CLI and Terraform.
-   Demo App is developed in React/TypeScript, and Chakra UI

Details will be as follows, please set up if necessary.

| name                                                                                     | version |
| :--------------------------------------------------------------------------------------- | :------ |
| [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) | 2.6.0   |
| [Terraform CLI](https://learn.hashicorp.com/tutorials/terraform/install-cli)             | 1.1.0   |
| [react](https://github.com/facebook/react)                                               | 18.2.0  |
| [typescript](https://github.com/microsoft/TypeScript)                                    | 4.6.2   |
| [react-router-dom](https://github.com/remix-run/react-router)                            | 6.3.0   |
| [chakra-ui/react](https://github.com/chakra-ui/chakra-ui)                                | 2.2.4   |
| [aws-amplify](https://github.com/aws-amplify/amplify-js)                                 | 4.3.27  |

## 1. Infra

```
$ cd infra
$ terraform init
$ terraform plan
$ terraform apply
```

Then, You create a sample user using AWS CLI commands! ※Please type YOUR Cognito identification.

#### create a user

```
$ aws cognito-idp admin-create-user  --user-pool-id "{Please type your userpool id}"  --username "test-user-paprika"
```

#### Setting a password

```
$ aws cognito-idp admin-set-user-password --user-pool-id "{Please type your userpool id}" --username "test-user-paprika" --password 'Password1234#' --permanent
```

Completes the setup! Let's implement an application to use it.

## 2. App

```
$ cd app
$ npm i
```

Then, open the `.env` file.

Please set YOUR Cognito identification which is made from `1. Infra`

`.env` file

```
REACT_APP_AUTH_REGION={Please type aws region you want to use}
REACT_APP_AUTH_USER_POOL_ID={Please type your user id}
REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID={Please type your client id}
REACT_APP_AUTH_COOKIE_STORAGE_DOMAIN=localhost
```

Finally, you run the app!

```
$ npm start
```

**Congrats! You can see the top page.**
<img width="1267" alt="screenshot" src="https://user-images.githubusercontent.com/42430018/179391595-cc787f86-9df7-49d6-9b0e-97acfdbde78a.png">

Please go to the login page and touch the login demo!
