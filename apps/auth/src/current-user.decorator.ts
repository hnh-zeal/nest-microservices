import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from './users/models/users.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
