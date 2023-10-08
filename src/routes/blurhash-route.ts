import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { post } from '../controllers/blurhash-controller';

async function blurhashRoute(request: Request): Promise<Response> {
  switch (request.method) {
    case 'POST':
      return await post(request);
  }

  return Response.json(
    { message: ReasonPhrases.METHOD_NOT_ALLOWED },
    { status: StatusCodes.METHOD_NOT_ALLOWED },
  );
}

export { blurhashRoute };
