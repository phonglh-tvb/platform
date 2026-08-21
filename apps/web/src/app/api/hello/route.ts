import type { MessageResponse } from '@platform/shared-types';

export async function GET(): Promise<Response> {
  const body: MessageResponse = { message: 'Hello, from API!' };

  return Response.json(body);
}
