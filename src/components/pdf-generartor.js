import WeekdayTables from "../Tables/Tables";

import React from "react";
import jsPDF from "jspdf";

const PDFGenerator = ({ data }) => {
  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text(20, 20, "Weekly Report");

    Object.keys(data).forEach(weekday => {
      pdf.text(20, 30, weekday);
      pdf.text(20, 40, "Planned");
      pdf.text(50, 40, "Actual");

      Object.keys(data[weekday]).forEach(field => {
        Object.keys(data[weekday][field]).forEach(row => {
          pdf.text(20, 50, row);
          pdf.text(50, 50, data[weekday][field][row]);
        });
      });
    });

    pdf.save("WeeklyReport.pdf");
  };

  return (
    <div>
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
};

export default PDFGenerator;