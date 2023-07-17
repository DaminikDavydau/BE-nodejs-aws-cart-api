import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { Construct } from 'constructs';

export class BeNodejsAwsCartApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, 'CartLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('dist'), // Assuming the compiled code is in the 'dist' directory
      handler: 'main.handler',
      environment: {
        DB_HOST: 'nodejs-aws-db.c7ugxelvfu2k.eu-west-1.rds.amazonaws.com',
        DB_PORT: '5432',
        DB_USERNAME: 'defree',
        DB_PASSWORD: 'One200Two',
        DB_DATABASE: 'postgres',
      },
    });

    const apiCard = new apiGateway.HttpApi(this, 'CartApiHttp', {
      corsPreflight: {
        allowHeaders: ['*'],
        allowOrigins: ['*'],
        allowMethods: [apiGateway.CorsHttpMethod.ANY],
      },
    });

    apiCard.addRoutes({
      integration: new HttpLambdaIntegration(
        'cartLambdaIntegration',
        handler,
      ),
      path: '/{proxy+}',
      methods: [apiGateway.HttpMethod.ANY],
    });
  }
}
