import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export function criarToken(usuario) {
  return jwt.sing({
    id: usuario.id, 
    email: usuario.email
  },
  process.env.JWT_SECRET || "segredo_super_secreto",
  { expiresIn: "1d" }
  );
}

 export function verificarToken(req) {
   try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '') || cookies().get('token')?.value;

    if (!token) throw new Error("Não existe Token");

    return jwt.verify(token, process.env.JWT_SECRET || "segredo_super_secreto");
   } catch (error) {
    throw new Error("Token inválido")
   }
 }
 
 export function getTokenFromCookies() {
    return cookies().get("token")?.value
 }