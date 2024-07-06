import React from 'react';

function removeScripts(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Remove script elements
  const scripts = doc.querySelectorAll('script');
  scripts.forEach((script) => script.remove());

  // More robust removal of inline scripts and jQuery code:
  const regex = /<script[^>]*>([\s\S]*?)<\/script>/gm; // Matches script tags with content
  const filteredHtml = htmlString.replace(regex, '');

  return filteredHtml;
}

function ExtractContent(props) {
  const content = props.html;

  const filteredContent = removeScripts(content);

  return (
    <div dangerouslySetInnerHTML={{ __html: filteredContent }} />
  );
}

export default ExtractContent;
