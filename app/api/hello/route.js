
export async function GET(req) {
    const res = new Response(JSON.stringify({ message: "Hello, World!" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        }
    });
    res.headers.set('x-hello', 'world');
    return res;
}