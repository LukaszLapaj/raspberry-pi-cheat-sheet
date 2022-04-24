import './App.css';
import ReactMarkdown from 'react-markdown'
import {useEffect, useState} from "react";

function App() {
    const [markdownText, setMarkdownText] = useState('');

    const projectUrl = "https://github.com/LukaszLapaj/raspberry-pi-cheat-sheet";
    const readmeUrl = "https://raw.githubusercontent.com/LukaszLapaj/raspberry-pi-cheat-sheet/master/README.md";
    const tableOfContentsRegex = new RegExp("# Table of contents[\\s\\S]*?[\\n](?=#)");

    useEffect(() => {
        fetch(readmeUrl)
            .then((response) => {
                if (response.ok) return response.text();
                else return Promise.reject("Didn't fetch text correctly");
            })
            .then((text) => {
                let skippedTableOfContents = text.replace(tableOfContentsRegex, "");
                setMarkdownText(skippedTableOfContents);
            })
            .catch((error) => console.error(error));
    });

    return (
        <div className="markdown-container">
            <div className="markdown-container-inner">
                <ReactMarkdown children={markdownText}/>
                <div className="footer">
                    <a href={projectUrl}>View on GitHub</a>
                </div>
            </div>
        </div>
    );
}

export default App;
