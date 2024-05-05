// import { z } from "zod";

// export const MailFields = z.superRefine(
//   z.object({ token: z.string() }).shape.optional(), // Allow any fields + optional except token
//   (data) => {
//     if (!data.token) {
//       throw new Error("Token field is required");
//     }
//     // You can add further validation logic here if needed
//     return data;
//   }
// );

// export type mailFieldValues = z.infer<typeof mailFields>;
