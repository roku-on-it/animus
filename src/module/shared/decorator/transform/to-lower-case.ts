import { Transform, TransformOptions } from 'class-transformer';

export const ToLowerCase = (options?: TransformOptions) =>
  Transform(({ value }) => {
    if ('string' === typeof value) {
      return value.toLowerCase();
    }

    return value;
  }, options);
