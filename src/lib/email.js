import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarEmailRecuperacao(email, link) {
  console.log("EMAIL DESTINO:", email);
  console.log("LINK:", link);
  console.log("API KEY EXISTE?", !!process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "EmpregaKi <onboarding@resend.dev>",
    to: [email],
    subject: "Recuperação de senha - EmpregaKi",
    html: `
      <h2>Recuperação de senha</h2>
      <p>Recebemos uma solicitação para redefinir sua senha.</p>
      <p><a href="${link}">Clique aqui para redefinir sua senha</a></p>
    `,
  });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    throw error;
  }

  return data;
}