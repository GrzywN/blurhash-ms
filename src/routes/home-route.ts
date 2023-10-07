import { get } from "../controllers/home-controller";

function homeRoute(request: Request): Response {
    switch (request.method) {
        case "GET": return get(request);
    }

    return new Response(null, { status: 405 });
}

export { homeRoute };