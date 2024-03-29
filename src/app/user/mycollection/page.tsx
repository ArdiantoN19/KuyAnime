import Collection from "@/components/Collection";
import Header from "@/components/Dashboard/Header";
import { FunctionComponent } from "react";

export const dynamic = "force-dynamic";

const Page: FunctionComponent = async () => {
  return (
    <section className="container min-h-[90vh] mt-8">
      <Header title="My Collections" />
      <Collection />
    </section>
  );
};

export default Page;
