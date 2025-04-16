const getCodeSnippet = ({ id = "", tech }) => {
  const javascriptCodeSnippet = `
    const iframe = document.createElement("iframe");
    
    const iframeStyles = (styleString) => {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
    }
    
    iframeStyles(\`
        .chat-frame {
            position: fixed;
            bottom: 40px;
            right: 40px;
            border: none;
            transition: all 0.3s ease;
            z-index: 9999;
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

  const reactCodeSnippet = `
    import { useEffect } from "react";

    const ChatbotFrame = () => {
    useEffect(() => {
        const iframe = document.createElement("iframe");

        const iframeStyles = (styleString) => {
            const style = document.createElement("style");
            style.textContent = styleString;
            document.head.append(style);
        };

        iframeStyles(\`
            .chat-frame {
                position: fixed;
                bottom: 40px;
                right: 40px;
                border: none;
                transition: all 0.3s ease;
                z-index: 9999;
            }
        \`);

        iframe.src = "${process.env.NEXT_PUBLIC_BASE_API_URL}/chatbot";
        iframe.classList.add("chat-frame");
        document.body.appendChild(iframe);

        const handleMessage = (e) => {
            if (e.origin !== "${process.env.NEXT_PUBLIC_BASE_API_URL}") return;

            try {
                const dimensions = JSON.parse(e.data);
                iframe.width = dimensions.width;
                iframe.height = dimensions.height;
                iframe.contentWindow.postMessage(
                "e25ae0ba-31c9-4482-b12a-34b3ef9739a5",
                "${process.env.NEXT_PUBLIC_BASE_API_URL}/"
                );
            } catch (err) {
                console.error("Invalid message data", err);
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
            document.body.removeChild(iframe);
        };
    }, []);

    return null;
    };

    export default ChatbotFrame;
`;

  const MAPPING = {
    javascript: javascriptCodeSnippet,
    react: reactCodeSnippet,
  };

  return MAPPING[tech] || javascriptCodeSnippet;
};
export default getCodeSnippet;
