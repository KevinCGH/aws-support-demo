import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as nodejs from "@aws-cdk/aws-lambda-nodejs";
import * as path from "path";

export interface ServiceStackProps extends cdk.StackProps {
  sharedLayer: lambda.LayerVersion;
}

export class ServiceStack extends cdk.Stack {
  readonly serviceFunc: nodejs.NodejsFunction;
  constructor(scope: cdk.Construct, id: string, props: ServiceStackProps) {
    super(scope, id, props);
    this.serviceFunc = new nodejs.NodejsFunction(this, "ServiceFunction", {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: path.join(process.cwd(), "./app/function/service-handle/index.ts"),
      memorySize: 128,
      layers: [props.sharedLayer],
    });
  }
}
