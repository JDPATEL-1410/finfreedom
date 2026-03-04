import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PDFSection {
    title: string;
    rows: [string, string][];
}

interface PDFReportOptions {
    title: string;
    subtitle: string;
    sections: PDFSection[];
    chartElementId?: string;
    disclaimer?: string;
}

export async function generatePDFReport(options: PDFReportOptions): Promise<void> {
    const { title, subtitle, sections, chartElementId, disclaimer } = options;

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = 210;
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    let y = 0;

    // --- Header ---
    // Primary color banner
    pdf.setFillColor(51, 92, 142);
    pdf.rect(0, 0, pageWidth, 38, 'F');

    // Logo text
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('FinFreedom33', margin, 16);

    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(190, 210, 235);
    pdf.text('AMFI Registered Mutual Fund Distributor | CFP Certified', margin, 23);

    // Report title
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text(title, margin, 32);

    y = 48;

    // Subtitle
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text(subtitle, margin, y);
    y += 6;

    // Date
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    const now = new Date();
    pdf.text(`Generated: ${now.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}`, margin, y);
    y += 10;

    // --- Sections ---
    for (const section of sections) {
        // Section header
        pdf.setFillColor(31, 42, 68);
        pdf.rect(margin, y, contentWidth, 8, 'F');
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(255, 255, 255);
        pdf.text(section.title, margin + 4, y + 5.5);
        y += 12;

        // Rows
        let rowBg = false;
        for (const [label, value] of section.rows) {
            if (rowBg) {
                pdf.setFillColor(245, 247, 250);
                pdf.rect(margin, y - 1, contentWidth, 8, 'F');
            }
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(80, 80, 80);
            pdf.text(label, margin + 4, y + 4);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(31, 42, 68);
            pdf.text(value, margin + contentWidth - 4, y + 4, { align: 'right' });
            // Bottom border
            pdf.setDrawColor(230, 230, 230);
            pdf.line(margin, y + 7, margin + contentWidth, y + 7);
            y += 8;
            rowBg = !rowBg;
        }
        y += 6;
    }

    // --- Chart ---
    if (chartElementId) {
        const chartEl = document.getElementById(chartElementId);
        if (chartEl) {
            try {
                const canvas = await html2canvas(chartEl, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = contentWidth;
                const imgHeight = (canvas.height / canvas.width) * imgWidth;

                // Check if we need a new page
                if (y + imgHeight + 10 > 280) {
                    pdf.addPage();
                    y = 18;
                }

                // Chart header
                pdf.setFillColor(31, 42, 68);
                pdf.rect(margin, y, contentWidth, 8, 'F');
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(255, 255, 255);
                pdf.text('Investment Growth Chart', margin + 4, y + 5.5);
                y += 12;

                pdf.addImage(imgData, 'PNG', margin, y, imgWidth, Math.min(imgHeight, 80));
                y += Math.min(imgHeight, 80) + 8;
            } catch (e) {
                console.warn('Chart capture failed:', e);
            }
        }
    }

    // --- Disclaimer ---
    if (y + 28 > 280) {
        pdf.addPage();
        y = 18;
    }

    pdf.setFillColor(255, 248, 240);
    pdf.rect(margin, y, contentWidth, 28, 'F');
    pdf.setDrawColor(235, 62, 74);
    pdf.rect(margin, y, 2, 28, 'F');
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(235, 62, 74);
    pdf.text('DISCLAIMER:', margin + 6, y + 5);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 70, 50);
    const disclaimerText =
        disclaimer ||
        'This report is for informational purposes only and does not constitute financial advice. ' +
        'Mutual fund investments are subject to market risks. Please read all scheme related documents carefully before investing. ' +
        'Past performance is not indicative of future returns. The projections shown are indicative and based on assumed rates of return.';
    const lines = pdf.splitTextToSize(disclaimerText, contentWidth - 12);
    pdf.text(lines, margin + 6, y + 11);

    y += 34;

    // --- Footer ---
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(150, 150, 150);
    pdf.text('FinFreedom33 LLP | +91-9327002340 | nitin@finfreedom33.com | www.finfreedom33.com', pageWidth / 2, 290, { align: 'center' });

    // Save
    const filename = `${title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.pdf`;
    pdf.save(filename);
}
