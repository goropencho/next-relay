"use client";

export default function Contact() {
  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("token", "fJJLHN");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });
    const result = await response.json();
    if (result.success) {
      console.log(result);
    }
  }

  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <form onSubmit={handleSubmit} className="max-">
        <input type="text" name="name" placeholder="name" />
        <input type="email" name="email" placeholder="email" />
        <textarea name="message" placeholder="message"></textarea>
        <button type="submit">Submit Form</button>
      </form>
    </main>
  );
}
