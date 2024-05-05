import { EmailService } from "@/lib/services/emailService";

export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  const service = new EmailService();
  if (!reqBody.token) {
    return Response.json(
      { message: "Token missing" },
      {
        status: 400,
      }
    );
  }

  try {
    await service.sendMail(reqBody);
  } catch (err) {
    return Response.json(
      { message: "Unexpected Error on the server-side" },
      {
        status: 500,
      }
    );
  }
  return Response.json(
    { message: "Form Submitted Successfully" },
    {
      status: 200,
    }
  );
}
