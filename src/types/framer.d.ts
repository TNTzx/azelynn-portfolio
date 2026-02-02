import type { Target, TargetAndTransition } from "framer-motion";

declare module "motion" {
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