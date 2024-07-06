export const scrapeContent = async (url, option) => {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
  
    let content;
    if (option === 'entire') {
      content = doc.body.innerText;
    } else if (option === 'section') {
      const article = doc.querySelector('article');
      content = article ? article.innerText : 'Main article body not found.';
    }
  
    return content;
  };
  