import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ id = "" }) => {
  const codeSnippet = `
    const iframe = document.createElement("iframe");
    
    const iframeStyles = (styleString) => {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
    }
    
    iframeStyles('
        .chat-frame {
            position: fixed;
            bottom: 50px;
            right: 50px;
            border: none;
        }
    ')
    
    iframe.src = "http://localhost:3000/chatbot"
    iframe.classList.add('chat-frame')
    document.body.appendChild(iframe)
    
    window.addEventListener("message", (e) => {
        if(e.origin !== "http://localhost:3000") return null
        let dimensions = JSON.parse(e.data)
        iframe.width = dimensions.width
        iframe.height = dimensions.height
        iframe.contentWindow.postMessage("${id}", "http://localhost:3000/")
    })
        `;

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="size-3 rounded-full bg-red-500" />
          <div className="size-3 rounded-full bg-yellow-500" />
          <div className="size-3 rounded-full bg-green-500" />
        </div>

        <div className="flex items-center gap-3 cursor-pointer ">
          <p className="text-gray-400 text-xs">Copy code</p>
          <Copy className="text-white size-4" />
        </div>
      </div>

      <SyntaxHighlighter
        language="javascript"
        style={atomDark}
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
