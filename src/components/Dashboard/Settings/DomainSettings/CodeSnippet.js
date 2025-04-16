import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { copyToClipboard } from "@/lib/utils";

const CodeSnippet = ({ id = "" }) => {
  const { resolvedTheme } = useTheme();

  const syntaxTheme = resolvedTheme === "dark" ? materialLight : atomDark;

  const codeSnippet = `
    const iframe = document.createElement("iframe");
    
    const iframeStyles = (styleString) => {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
    }
    
    iframeStyles(\`
        .chat-frame {
            position: fixed;
            bottom: 50px;
            right: 50px;
            border: none;
        }
    \`)
    
    iframe.src = "${process.env.NEXT_PUBLIC_BASE_API_URL}/chatbot"
    iframe.classList.add('chat-frame')
    document.body.appendChild(iframe)
    
    window.addEventListener("message", (e) => {
        if(e.origin !== "${process.env.NEXT_PUBLIC_BASE_API_URL}") return null
        let dimensions = JSON.parse(e.data)
        iframe.width = dimensions.width
        iframe.height = dimensions.height
        iframe.contentWindow.postMessage("${id}", "${process.env.NEXT_PUBLIC_BASE_API_URL}/")
    })
        `;

  return (
    <div className="w-full max-w-3xl rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-800 dark:bg-gray-200 px-4 py-2 flex justify-between items-center">
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
          <p className="text-gray-400 dark:text-gray-800 text-xs">Copy code</p>
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
  );
};

export default CodeSnippet;
