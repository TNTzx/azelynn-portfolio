import type { Target, TargetAndTransition } from "motion/react";

declare module "motion/react" {
  type TargetResolver<T> = (
    custom: T,
    current: Target,
    velocity: Target,
  ) => TargetAndTransition | string;

  type Variant<T> = TargetAndTransition | TargetResolver<T>;

  type Variants<T> = {
    [key: string]: Variant<T>;
  };
}