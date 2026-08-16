import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========================
// ASSETS
// =========================

const logoPath = path.join(
  __dirname,
  "../assets/logo.png"
);

const signaturePath = path.join(
  __dirname,
  "../assets/mysign.png"
);

// =========================
// GENERATE CERTIFICATE
// =========================

export const generateCertificate = ({
  name,
  topic,
  score,
  totalQuestions,
  accuracy,
  certificateId,
}) => {
  return new Promise((resolve, reject) => {
    try {
      // =========================
      // CERTIFICATE FOLDER
      // =========================

      const certificatesDir = path.join(
        __dirname,
        "../certificates"
      );

      if (!fs.existsSync(certificatesDir)) {
        fs.mkdirSync(certificatesDir, {
          recursive: true,
        });
      }

      const fileName = `certificate-${certificateId}.pdf`;

      const filePath = path.join(
        certificatesDir,
        fileName
      );

      // =========================
      // PDF
      // =========================

      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margins: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      });

      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      const width = doc.page.width;
      const height = doc.page.height;

      // =========================
      // COLORS
      // =========================

      const navy = "#0b132b";
      const darkNavy = "#111827";
      const gold = "#c9a227";
      const lightGold = "#e6d18a";
      const gray = "#64748b";
      const lightGray = "#94a3b8";
      const background = "#fbfaf7";

      // =========================
      // BACKGROUND
      // =========================

      doc
        .rect(0, 0, width, height)
        .fill(background);

      // =========================
      // PREMIUM OUTER BORDER
      // =========================

      doc
        .lineWidth(10)
        .strokeColor(navy)
        .rect(
          18,
          18,
          width - 36,
          height - 36
        )
        .stroke();

      // =========================
      // GOLD BORDER
      // =========================

      doc
        .lineWidth(2)
        .strokeColor(gold)
        .rect(
          31,
          31,
          width - 62,
          height - 62
        )
        .stroke();

      // =========================
      // INNER GOLD BORDER
      // =========================

      doc
        .lineWidth(0.7)
        .strokeColor(lightGold)
        .rect(
          43,
          43,
          width - 86,
          height - 86
        )
        .stroke();

      // =========================
      // DECORATIVE CORNERS
      // =========================

      // Top left
      doc
        .lineWidth(2)
        .strokeColor(gold)
        .moveTo(48, 75)
        .lineTo(48, 48)
        .lineTo(75, 48)
        .stroke();

      // Top right
      doc
        .moveTo(width - 48, 75)
        .lineTo(width - 48, 48)
        .lineTo(width - 75, 48)
        .stroke();

      // Bottom left
      doc
        .moveTo(48, height - 75)
        .lineTo(48, height - 48)
        .lineTo(75, height - 48)
        .stroke();

      // Bottom right
      doc
        .moveTo(width - 48, height - 75)
        .lineTo(width - 48, height - 48)
        .lineTo(width - 75, height - 48)
        .stroke();

      // =========================
      // LOGO
      // =========================

      if (fs.existsSync(logoPath)) {
        doc.image(
          logoPath,
          width / 2 - 70,
          52,
          {
            width: 140,
            height: 70,
          }
        );
      }

      // =========================
      // BRAND NAME
      // =========================

      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor(navy)
        .text(
          "CODEPREP",
          0,
          126,
          {
            width: width,
            align: "center",
            characterSpacing: 2,
          }
        );

      // =========================
      // TAGLINE
      // =========================

      doc
        .font("Helvetica")
        .fontSize(8)
        .fillColor(gray)
        .text(
          "MASTER  •  PRACTICE  •  SUCCEED",
          0,
          143,
          {
            width: width,
            align: "center",
            characterSpacing: 1,
          }
        );

      // =========================
      // TITLE
      // =========================

      doc
        .font("Helvetica-Bold")
        .fontSize(27)
        .fillColor(navy)
        .text(
          "CERTIFICATE",
          0,
          158,
          {
            width: width,
            align: "center",
            characterSpacing: 3,
          }
        );

      doc
        .font("Helvetica")
        .fontSize(12)
        .fillColor(gold)
        .text(
          "OF COMPLETION",
          0,
          191,
          {
            width: width,
            align: "center",
            characterSpacing: 3,
          }
        );

      // =========================
      // GOLD DIVIDER
      // =========================

      doc
        .moveTo(width / 2 - 105, 214)
        .lineTo(width / 2 - 20, 214)
        .lineWidth(1.5)
        .strokeColor(gold)
        .stroke();

      doc
        .moveTo(width / 2 + 20, 214)
        .lineTo(width / 2 + 105, 214)
        .lineWidth(1.5)
        .strokeColor(gold)
        .stroke();

      // Center diamond
      doc
        .save()
        .translate(width / 2, 214)
        .rotate(45)
        .rect(-5, -5, 10, 10)
        .fill(gold)
        .restore();

      // =========================
      // PRESENTED TO
      // =========================

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(gray)
        .text(
          "This certificate is proudly presented to",
          0,
          228,
          {
            width: width,
            align: "center",
          }
        );

      // =========================
      // NAME
      // =========================

      doc
        .font("Helvetica-Bold")
        .fontSize(29)
        .fillColor(darkNavy)
        .text(
          name,
          80,
          250,
          {
            width: width - 160,
            align: "center",
          }
        );

      // Elegant name underline
      doc
        .moveTo(width / 2 - 125, 291)
        .lineTo(width / 2 + 125, 291)
        .lineWidth(1)
        .strokeColor(lightGold)
        .stroke();

      // =========================
      // DESCRIPTION
      // =========================

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(gray)
        .text(
          "for successfully completing the",
          0,
          305,
          {
            width: width,
            align: "center",
          }
        );

      // =========================
      // TOPIC
      // =========================

      doc
        .font("Helvetica-Bold")
        .fontSize(18)
        .fillColor(navy)
        .text(
          `${topic} Coding Interview Quiz`,
          80,
          325,
          {
            width: width - 160,
            align: "center",
          }
        );

      // =========================
      // ACHIEVEMENT LINE
      // =========================

      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(gray)
        .text(
          "Demonstrating knowledge, preparation, and coding proficiency",
          0,
          350,
          {
            width: width,
            align: "center",
          }
        );

      // =========================
      // ISSUE DATE
      // =========================

      doc
        .font("Helvetica")
        .fontSize(8)
        .fillColor(lightGray)
        .text(
          `Issued on ${new Date().toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          )}`,
          0,
          385,
          {
            width: width,
            align: "center",
          }
        );

      // =========================
      // SIGNATURE SECTION
      // =========================

      const signatureX = 105;
      const signatureY = 445;

      if (fs.existsSync(signaturePath)) {
        doc.image(
          signaturePath,
          signatureX,
          signatureY,
          {
            width: 115,
            height: 35,
          }
        );
      }

      // Signature line
      doc
        .moveTo(signatureX - 5, 482)
        .lineTo(signatureX + 125, 482)
        .lineWidth(1)
        .strokeColor(navy)
        .stroke();

      // Founder name
      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor(navy)
        .text(
          "Aleeza Amjad",
          signatureX - 5,
          488,
          {
            width: 130,
            align: "center",
          }
        );

      // Founder title
      doc
        .font("Helvetica")
        .fontSize(7)
        .fillColor(gray)
        .text(
          "Founder • CodePrep",
          signatureX - 5,
          502,
          {
            width: 130,
            align: "center",
          }
        );

      // =========================
      // CERTIFICATE ID
      // =========================

      const idX = width - 285;

      doc
        .font("Helvetica")
        .fontSize(7)
        .fillColor(lightGray)
        .text(
          `Certificate ID: ${certificateId}`,
          idX,
          482,
          {
            width: 180,
            align: "center",
            lineBreak: false,
            characterSpacing: 0.3,
          }
        );

      // =========================
      // FOOTER BRAND
      // =========================

      doc
        .font("Helvetica")
        .fontSize(6.5)
        .fillColor(lightGray)
        .text(
          "CODEPREP  •  CODING INTERVIEW PREPARATION",
          0,
          height - 42,
          {
            width: width,
            align: "center",
            characterSpacing: 1,
          }
        );

      // =========================
      // FINISH
      // =========================

      doc.end();

      stream.on("finish", () => {
        resolve(filePath);
      });

      stream.on("error", (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};