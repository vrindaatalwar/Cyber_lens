import "dotenv/config";
import { OTXProvider } from "./otx.provider";

function printResult(title: string, result: any) {
  console.log(`--------------------------\n${title}--------------------------`);
  console.log("Verdict:", result.verdict);
  console.log("Score:", result.score);
  console.log("Confidence:", result.confidence);
  console.log("Summary:", result.summary);

  if (result.tags && result.tags.length > 0) {
    console.log(
      "Tags:",
      result.tags.slice(0, 5).join(", "),
      result.tags.length > 5 ? "...more" : ""
    );
  }
}

async function testOTXProvider() {
  const provider = new OTXProvider();

  console.log("Provider name:", provider.name);
  console.log("Supported IOC types:", provider.supportedIocTypes);

  // IP test
  const cleanIpResult = await provider.query("8.8.8.8", "ip");
  printResult("IP (8.8.8.8)", cleanIpResult);

  // Domain test
  const domainResult = await provider.query("example.com", "domain");
  printResult("Domain (example.com)", domainResult);

  // URL test
  const urlResult = await provider.query("URL (google.com)", "url");
  printResult("URL (http://google.com)", urlResult);

  // Hash test
  const hashResult = await provider.query(
    "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f",
    "hash"
  );
  printResult("File Hash", hashResult);
}

testOTXProvider().catch((err) => {
  console.error("Unexpected test error:", err);
});
