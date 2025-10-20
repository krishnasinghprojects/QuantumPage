import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [htmlContent, setHtmlContent] = useState('');
    const [error, setError] = useState('');
    const [showContent, setShowContent] = useState(false);

    const PROMPT = `
You are an elite web developer with a flair for creative and minimalist design.
Your mission is to generate a single, self-contained HTML file for a small, interactive web application or a visually engaging landing page.

**Core Requirements:**
1.  **Single File:** All HTML, CSS, and JavaScript must be in one file. No external files.
2.  **Random & Novel Topic:** The theme of the page should be random, unique, and interesting. Think of a mini-tool, a generative art piece, a unique calculator, or a poetic visualization.
3.  **Modern & Responsive Design:** The layout must be clean, modern, and work flawlessly on both desktop and mobile devices.
4.  **Typography:** You MUST use only the 'Lora' and 'Young Serif' fonts. Import them using this exact Google Fonts URL inside the <head>: <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Young+Serif&display=swap" rel="stylesheet">
5.  **Concise Code:** Keep the code efficient and well-formatted. The goal is a lightweight, fast-loading page.

**Output Format:**
-   Provide ONLY the raw HTML code.
-   Start the response directly with \`<!DOCTYPE html>\`.
-   Do not include any explanations, comments, or markdown formatting (like \`\`\`html) around the code.
`;

    useEffect(() => {
        const generatePage = async () => {
            try {
                const response = await fetch('/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: PROMPT.trim() })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    const errorMsg = errorData?.error || `HTTP error! Status: ${response.status}`;
                    throw new Error(errorMsg);
                }

                const data = await response.json();
                const content = data.htmlContent;

                if (!content) {
                    throw new Error("Received an empty response from the API.");
                }

                setHtmlContent(content);

                // Simulate loading completion
                setTimeout(() => {
                    setIsLoading(false);
                    setTimeout(() => {
                        setShowContent(true);
                    }, 100);
                }, 1000);

            } catch (err) {
                console.error('Failed to generate page:', err);
                setError(err.message);
                setIsLoading(false);
            }
        };

        generatePage();
    }, []);

    return (
        <>
            <Head>
                <title>Random Page Generator</title>
                <meta name="description" content="A serverless random page generator using Gemini AI" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Young+Serif&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="app">
                {isLoading && (
                    <div className={`loader ${!isLoading ? 'fade-out' : ''}`}>
                        <div className="loading-text">
                            Loading
                            <span className="loading-dots">
                                <span>.</span>
                                <span>.</span>
                                <span>.</span>
                            </span>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar"></div>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                    </div>
                )}

                {htmlContent && (
                    <iframe
                        className={`content-frame ${showContent ? 'visible' : ''}`}
                        title="Generated Content"
                        srcDoc={htmlContent}
                    />
                )}
            </div>

            <style jsx global>{`
        :root {
          --dark-blue: #0A0A2A;
          --medium-blue: #1A1A4A;
          --light-blue: #3A3A7A;
          --text-color-light: #E0E0E0;
          --text-color-primary: #8AB4F8;
          --glass-border: rgba(255, 255, 255, 0.18);
          --glass-bg: rgba(255, 255, 255, 0.05);
          --radial-gradient-start: #0f172a;
          --radial-gradient-end: #050a1b;
        }

        * {
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
          background: radial-gradient(circle at center, var(--radial-gradient-start) 0%, var(--radial-gradient-end) 100%);
          min-height: 100vh;
        }

        .app {
          position: relative;
          width: 100vw;
          height: 100vh;
        }

        .loader {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(15px) saturate(180%);
          -webkit-backdrop-filter: blur(15px) saturate(180%);
          transition: opacity 0.7s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.7s;
          opacity: 1;
          visibility: visible;
          color: var(--text-color-light);
          text-shadow: 0 0 10px rgba(138, 180, 248, 0.3);
        }

        .loader.fade-out {
          opacity: 0;
          visibility: hidden;
        }

        .loading-text {
          font-family: 'Young Serif', serif;
          font-size: 3rem;
          font-weight: 400;
          margin-bottom: 25px;
          letter-spacing: 1px;
          color: var(--text-color-primary);
        }

        .loading-dots span {
          display: inline-block;
          animation: dot-animation 1.5s infinite ease-in-out;
          opacity: 0;
          font-size: 3rem;
          color: var(--text-color-primary);
        }

        .loading-dots span:nth-child(1) { animation-delay: 0s; }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dot-animation {
          0%, 20% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-10px); }
          100% { opacity: 0; transform: translateY(0); }
        }

        .progress-bar-container {
          width: 80%;
          max-width: 400px;
          height: 10px;
          background-color: var(--glass-bg);
          border-radius: 10px;
          border: 1px solid var(--glass-border);
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .progress-bar {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, var(--text-color-primary), #a7c7fa);
          border-radius: 10px;
          transform-origin: left;
          animation: load-progress 2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes load-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .content-frame {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          border: none;
          opacity: 0;
          transition: opacity 0.7s cubic-bezier(0.25, 1, 0.5, 1) 0.3s;
        }

        .content-frame.visible {
          opacity: 1;
        }

        .error-message {
          color: #f87171;
          font-size: 1.2rem;
          text-align: center;
          padding: 20px;
          margin-top: 30px;
          max-width: 80%;
        }

        @media (max-width: 768px) {
          .loading-text {
            font-size: 2rem;
          }
          
          .loading-dots span {
            font-size: 2rem;
          }
        }
      `}</style>
        </>
    );
}