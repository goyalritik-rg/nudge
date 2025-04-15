import { getDomainDetails } from "@/actions/settings";

const DomainSettings = async ({ params = {} }) => {
  const domainData = await getDomainDetails(params.domain);

  console.log("domainData", domainData);

  if (!domainData) {
    redirect("/dashboard");
  }

  return <div>DomainSettings</div>;
};

export default DomainSettings;
