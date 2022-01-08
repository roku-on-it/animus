import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { maxDepth } from 'src/module/misc/app-graphql/validation/max-depth';
import {
  MAX_COMPLEXITY,
  MAX_QUERY_DEPTH,
} from 'src/module/misc/app-graphql/constants';
import { ComplexityPlugin } from 'src/module/misc/app-graphql/validation/query-complexity';

@Module({
  imports: [
    GraphQLModule.forRoot({
      cors: false,
      sortSchema: true,
      autoSchemaFile: true,
      plugins: [new ComplexityPlugin(MAX_COMPLEXITY)],
      validationRules: [maxDepth(MAX_QUERY_DEPTH)],
      context: ({ req, res }) => ({ req, res }),
      formatError: (error: GraphQLError) => {
        return {
          message: error.message,
          status: error.extensions.exception?.status,
        };
      },
    }),
  ],
  exports: [GraphQLModule],
})
export class AppGraphqlModule {}
