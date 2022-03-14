import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import { join } from "path";

export interface GlobalStackProps extends cdk.StackProps {}

export class GlobalStack extends cdk.Stack {
  public readonly sharedLayerVersion: lambda.LayerVersion;
  constructor(scope: cdk.Construct, id: string, props: GlobalStackProps) {
    super(scope, id, props);

    this.sharedLayerVersion = new lambda.LayerVersion(
      this,
      "SharedLayerVersion",
      {
        compatibleRuntimes: [
          lambda.Runtime.NODEJS_12_X,
          lambda.Runtime.NODEJS_14_X,
        ],
        code: lambda.Code.fromAsset(join(process.cwd(), "./app/layer/core")),
      }
    );
  }
}
