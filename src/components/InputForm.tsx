"use client";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "./ui/form";
import { Input } from "./ui/input";
import { createAccessToken } from "@/app/_action";
import {
  CreateAccessToken,
  CreateAccessTokenValues,
} from "@/lib/schemas/accessToken";
import { zodResolver } from "@hookform/resolvers/zod";

export default function InputForm() {
  const form = useForm<CreateAccessTokenValues>({
    resolver: zodResolver(CreateAccessToken),
  });

  const { control, handleSubmit } = form;

  let result;

  async function onSubmit(values: any) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        // @ts-ignore
        formData.append(key, value);
      }
    });
    result = await createAccessToken(formData);
  }
  return (
    <>
      <Form {...form}>
        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. abc@xyz.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Access Token</Button>
        </form>
      </Form>

      <div>{result && <p>{result}</p>}</div>
    </>
  );
}
