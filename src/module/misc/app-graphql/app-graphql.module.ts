import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { maxDepth } from 'src/module/misc/app-graphql/validation/max-depth';
import {
  MAX_COMPLEXITY,
  MAX_QUERY_DEPTH,
} from 'src/module/misc/app-graphql/constants';
import { ComplexityPlugin } from 'src/module/misc/app-graphql/validation/query-complexity';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: false,
      sortSchema: true,
      autoSchemaFile: true,
      driver: ApolloDriver,
      plugins: [new ComplexityPlugin(MAX_COMPLEXITY)],
      validationRules: [maxDepth(MAX_QUERY_DEPTH)],
      context: ({ req, res }) => ({ req, res }),
      formatError: (error: GraphQLError) => {
        return error.extensions.response as GraphQLError;
      },
    }),
  ],
  exports: [GraphQLModule],
})
export class AppGraphqlModule {}
