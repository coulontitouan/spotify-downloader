import { downloadTrack } from "@/lib/downloader";
import { NextResponse } from "next/server";

export const POST = async (request, response) => {
    const track = await request.json();

    try {
        // Call downloadPlaylist function to generate the zip file
        const { buffer, filename } = await downloadTrack(track);

        const responseHeaders = new Headers(response.headers);
        responseHeaders.set(
            "Content-Disposition",
            `attachment; filename="${filename}"`
        );
        responseHeaders.set(
            "User-Agent",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
        );

        return new Response(buffer, {
            headers: responseHeaders,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "There has been an error downloading the playlist" },
            { status: 500 }
        );
    }
};
