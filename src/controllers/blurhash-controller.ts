import { z } from "zod";
import { schema } from "../schemas/blurhash-post-body";
import { BlurhashService } from "../services/blurhash-service";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const service = new BlurhashService();

async function post(request: Request): Promise<Response> {
  let body: unknown;

  try {
    body = (await request.json()) as unknown;
  } catch (e: unknown) {
    return Response.json(
      { message: ReasonPhrases.BAD_REQUEST },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  let parsedBody: z.infer<typeof schema>;

  try {
    parsedBody = await schema.parseAsync(body);
  } catch (error: unknown) {
    return Response.json(
      { message: (error as Error).message },
      { status: StatusCodes.UNPROCESSABLE_ENTITY }
    );
  }

  try {
    const blurhash = await service.generateBlurhashFromImageUrl(
      parsedBody.imageUrl
    );

    return Response.json({ blurhash }, { status: 200 });
  } catch (error: unknown) {
    return Response.json(
      { message: (error as Error).message },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export { post };
