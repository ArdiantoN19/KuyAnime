import Header from "@/components/Dashboard/Header";
import Comment from "@/components/utils/Comment";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <section className="container min-h-[90vh] mt-8">
      <Header title="My Comments" />
      <Comment />
    </section>
  );
};

export default Page;
