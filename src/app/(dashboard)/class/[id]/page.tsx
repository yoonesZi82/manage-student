import React from "react";
import TableUser from "./components/table-user/TableUser";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="w-full container">
      <TableUser id={id} />
    </div>
  );
}

export default Page;
