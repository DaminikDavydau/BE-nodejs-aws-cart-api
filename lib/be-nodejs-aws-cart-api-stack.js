"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeNodejsAwsCartApiStack = void 0;
const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const apiGateway = require("@aws-cdk/aws-apigatewayv2-alpha");
const aws_apigatewayv2_integrations_alpha_1 = require("@aws-cdk/aws-apigatewayv2-integrations-alpha");
class BeNodejsAwsCartApiStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const handler = new lambda.Function(this, 'CartLambda', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('dist'),
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
            integration: new aws_apigatewayv2_integrations_alpha_1.HttpLambdaIntegration('cartLambdaIntegration', handler),
            path: '/{proxy+}',
            methods: [apiGateway.HttpMethod.ANY],
        });
    }
}
exports.BeNodejsAwsCartApiStack = BeNodejsAwsCartApiStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmUtbm9kZWpzLWF3cy1jYXJ0LWFwaS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJlLW5vZGVqcy1hd3MtY2FydC1hcGktc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLGlEQUFpRDtBQUNqRCw4REFBOEQ7QUFDOUQsc0dBQXFGO0FBR3JGLE1BQWEsdUJBQXdCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDcEQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUN0RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDbkMsT0FBTyxFQUFFLGNBQWM7WUFDdkIsV0FBVyxFQUFFO2dCQUNYLE9BQU8sRUFBRSx3REFBd0Q7Z0JBQ2pFLE9BQU8sRUFBRSxNQUFNO2dCQUNmLFdBQVcsRUFBRSxRQUFRO2dCQUNyQixXQUFXLEVBQUUsV0FBVztnQkFDeEIsV0FBVyxFQUFFLFVBQVU7YUFDeEI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUMxRCxhQUFhLEVBQUU7Z0JBQ2IsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDO2dCQUNuQixZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ25CLFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO2FBQzlDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUNoQixXQUFXLEVBQUUsSUFBSSwyREFBcUIsQ0FDcEMsdUJBQXVCLEVBQ3ZCLE9BQU8sQ0FDUjtZQUNELElBQUksRUFBRSxXQUFXO1lBQ2pCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1NBQ3JDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWxDRCwwREFrQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgYXBpR2F0ZXdheSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheXYyLWFscGhhJztcbmltcG9ydCB7IEh0dHBMYW1iZGFJbnRlZ3JhdGlvbiB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5djItaW50ZWdyYXRpb25zLWFscGhhJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5leHBvcnQgY2xhc3MgQmVOb2RlanNBd3NDYXJ0QXBpU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnQ2FydExhbWJkYScsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdkaXN0JyksIC8vIEFzc3VtaW5nIHRoZSBjb21waWxlZCBjb2RlIGlzIGluIHRoZSAnZGlzdCcgZGlyZWN0b3J5XG4gICAgICBoYW5kbGVyOiAnbWFpbi5oYW5kbGVyJyxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIERCX0hPU1Q6ICdub2RlanMtYXdzLWRiLmM3dWd4ZWx2ZnUyay5ldS13ZXN0LTEucmRzLmFtYXpvbmF3cy5jb20nLFxuICAgICAgICBEQl9QT1JUOiAnNTQzMicsXG4gICAgICAgIERCX1VTRVJOQU1FOiAnZGVmcmVlJyxcbiAgICAgICAgREJfUEFTU1dPUkQ6ICdPbmUyMDBUd28nLFxuICAgICAgICBEQl9EQVRBQkFTRTogJ3Bvc3RncmVzJyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBhcGlDYXJkID0gbmV3IGFwaUdhdGV3YXkuSHR0cEFwaSh0aGlzLCAnQ2FydEFwaUh0dHAnLCB7XG4gICAgICBjb3JzUHJlZmxpZ2h0OiB7XG4gICAgICAgIGFsbG93SGVhZGVyczogWycqJ10sXG4gICAgICAgIGFsbG93T3JpZ2luczogWycqJ10sXG4gICAgICAgIGFsbG93TWV0aG9kczogW2FwaUdhdGV3YXkuQ29yc0h0dHBNZXRob2QuQU5ZXSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBhcGlDYXJkLmFkZFJvdXRlcyh7XG4gICAgICBpbnRlZ3JhdGlvbjogbmV3IEh0dHBMYW1iZGFJbnRlZ3JhdGlvbihcbiAgICAgICAgJ2NhcnRMYW1iZGFJbnRlZ3JhdGlvbicsXG4gICAgICAgIGhhbmRsZXIsXG4gICAgICApLFxuICAgICAgcGF0aDogJy97cHJveHkrfScsXG4gICAgICBtZXRob2RzOiBbYXBpR2F0ZXdheS5IdHRwTWV0aG9kLkFOWV0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==