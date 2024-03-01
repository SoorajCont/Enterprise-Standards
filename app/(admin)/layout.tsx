import React, { PropsWithChildren } from "react";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="max-w-7xl min-h-screen grid place-items-center m-auto">
      {children}
    </main>
  );
};

export default AdminLayout;
