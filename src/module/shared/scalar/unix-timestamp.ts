import { GraphQLError, GraphQLScalarType } from 'graphql';
import { isPositive, isString } from 'class-validator';

export const UnixTimestampScalar: GraphQLScalarType = new GraphQLScalarType({
  name: 'UnixTimestamp',
  description: 'Timestamp in milliseconds',
  // value from the client
  parseValue: (value: number) => {
    if ('string' === typeof value || !isPositive(value)) {
      throw new GraphQLError(
        'UnixTimestamp cannot represent a ' +
          (isString(value) ? 'non-integer' : 'negative') +
          ' value: ' +
          value,
      );
    }
    return new Date(value);
  },
  // value sent to the client
  serialize: (value: string) => {
    return Date.parse(value);
  },
});
