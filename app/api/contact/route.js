import { connectDB } from "@/lib/mongodb";
import Message from "@/models/message";

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const newMessage = await Message.create(body);

  return Response.json({ success: true, newMessage });
}
