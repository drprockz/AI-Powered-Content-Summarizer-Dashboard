import React, { useState, useRef, useEffect } from 'react';
import { saveAs } from 'file-saver'; // Import saveAs for TXT export
import jsPDF from 'jspdf';
import '../assets/main.css';

const Sidebar = ({ history, onHistoryItemClick, summaryContent }) => {
  const [showExportOptions, setShowExportOptions] = useState(null); // Track which item has export options open
  const exportRef = useRef(null);

  const toggleExportOptions = (index) => {
    setShowExportOptions(showExportOptions === index ? null : index);
  };

  const handleExportTxt = (content) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const filename = 'history_item.txt';
    saveAs(blob, filename);
  };

  const handleExportPdf = (content) => {
    const doc = new jsPDF({
      orientation: 'portrait', // or 'landscape'
      unit: 'mm',
      format: 'a4',
    });

    const lines = doc.splitTextToSize(content, 180); // Adjust width as per your content needs
    let cursorY = 10; // Initial y position
    let pageHeight = doc.internal.pageSize.height;

    lines.forEach((line) => {
      if (cursorY + 10 > pageHeight) {
        doc.addPage(); // Add new page if content exceeds current page height
        cursorY = 10; // Reset y position for new page
      }
      doc.text(10, cursorY, line);
      cursorY += 10; // Move cursor down by 10 mm (adjust as needed)
    });

    doc.save('history_item.pdf');
  };

  const handleClickOutside = (event) => {
    if (exportRef.current && !exportRef.current.contains(event.target)) {
      setShowExportOptions(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <aside className="w-1/4 bg-[#171717] p-4">
      <h2 className="mb-4 font-sans text-white">History</h2>
      <ul className="grid gap-[10px]">
        {history.map((item, index) => (
          <li className="text-white font-sans text-sm bg-[#212121] p-2 rounded-md" key={index}>
            <div className="relative flex justify-around items-center">
              <button className="history-item" onClick={() => onHistoryItemClick(item)}>
                {item.split(' ').slice(0, 5).join(' ')}
              </button>
              <button
                className="p-2"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent closing dropdown when clicking button
                  toggleExportOptions(index);
                }}
              >
                {/* Three dots icon */}
                <span>&#8942;</span>
              </button>
              {showExportOptions === index && (
                <div ref={exportRef} className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-md overflow-hidden shadow-lg z-10">
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
                    onClick={() => handleExportTxt(item)}
                  >
                    Export as TXT
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
                    onClick={() => handleExportPdf(item)}
                  >
                    Export as PDF
                  </button>
                </div>
              )}
            </div>
            {/* Display summarized content */}
            {summaryContent && summaryContent.original === item && (
              <div className="mt-2 text-gray-400">
                <p className="font-semibold">Summarized:</p>
                <p>{summaryContent.summary}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
