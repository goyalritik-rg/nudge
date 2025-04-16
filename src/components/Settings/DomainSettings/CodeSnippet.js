import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { copyToClipboard } from "@/lib/utils";
import Chips from "@/common/components/Chips";
import { useState } from "react";
import getCodeSnippet from "@/lib/getCodeSnippet";

const TECHS = [
  {
    label: "Javascript",
    value: "javascript",
    icon: "/icons/javascript-logo.svg",
  },
  { label: "React JS", value: "react", icon: "/icons/react-logo.svg" },
];

const CodeSnippet = ({ id = "" }) => {
  const [tech, setTech] = useState("javascript");

  const { resolvedTheme } = useTheme();

  const syntaxTheme = resolvedTheme === "dark" ? oneLight : atomDark;

  const codeSnippet = getCodeSnippet({ id, tech });

  return (
    <div className="w-full max-w-2xl flex flex-col gap-6">
      <Chips value={tech} setValue={setTech} items={TECHS} />

      <div className="rounded-lg shadow-lg overflow-auto max-h-[620px] relative">
        <div className="bg-gray-800 dark:bg-gray-200 px-4 py-2 flex justify-between items-center sticky top-0">
          <div className="flex space-x-2">
            <div className="size-3 rounded-full bg-red-500" />
            <div className="size-3 rounded-full bg-yellow-500" />
            <div className="size-3 rounded-full bg-green-500" />
          </div>

          <div
            className="flex items-center gap-3 cursor-pointer"
            role="presentation"
            onClick={() => copyToClipboard({ text: codeSnippet })}
          >
            <p className="text-gray-400 dark:text-gray-800 text-xs">
              Copy code
            </p>
            <Copy className="text-white dark:text-gray-800 size-4" />
          </div>
        </div>

        <SyntaxHighlighter
          language="javascript"
          style={syntaxTheme}
          customStyle={{
            borderRadius: "0px",
            margin: 0,
            padding: "0.25rem",
            fontSize: "0.75rem",
            lineHeight: "1.5",
          }}
        >
          {codeSnippet}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeSnippet;
