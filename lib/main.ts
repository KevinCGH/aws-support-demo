import { ServiceStack } from "./service-stack";
import { GlobalStack } from "./global-stack";
import * as cdk from "@aws-cdk/core";
import { App, Environment } from "@aws-cdk/core";

const app = new App();

const defaultEnv: Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: "us-east-1",
};

const globalStack = new GlobalStack(app, "VM-GlobalStack-demo", {
  env: defaultEnv,
});

const serviceStack = new ServiceStack(app, "VM-ServiceStack-demo", {
  sharedLayer: globalStack.sharedLayerVersion,
  env: defaultEnv,
});
