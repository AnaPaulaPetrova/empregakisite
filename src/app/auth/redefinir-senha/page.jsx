import { Suspense } from "react";
import RedefinirSenhaClient from "./RedefinirSenhaClient";

export default function Page() {
  return ( 
    <Suspense fallback={<p>Carregando...</p>}>
      <RedefinirSenhaClient />
    </Suspense>
  );
}