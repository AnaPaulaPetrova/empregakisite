import { database } from "@/database/database";
import EmpresaPerfil from "../../../components/empresaPerfil";

export default async function EmpresaPage({ params }) {
  const { id } = await params;
  console.log("ID recebido:", id, typeof id);

  const result = await database.query(
    "SELECT * FROM empresas WHERE id = $1",
    [id]
  );

  const empresa = result.rows[0];
  console.log("RESULTADO:", result.rows);

  if (!empresa) {
  return <p>Empresa não encontrada</p>;
}

  return <EmpresaPerfil empresa={empresa} />;
}