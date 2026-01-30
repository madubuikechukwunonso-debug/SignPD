// pdf-lib helpers for blank & pre-drawn pages
import { rgb } from "pdf-lib";

export const TEMPLATES = {
  blank: () => null,

  lined: (page: any) => {
    const { width, height } = page.getSize();
    for (let y = 40; y < height - 40; y += 25) {
      page.drawLine({
        start: { x: 40, y },
        end:   { x: width - 40, y },
        thickness: 0.5,
        color: rgb(0.8, 0.8, 0.8),
      });
    }
  },

  grid: (page: any) => {
    const { width, height } = page.getSize();
    const gap = 20;
    for (let x = 40; x < width - 40; x += gap) {
      page.drawLine({
        start: { x, y: 40 },
        end:   { x, y: height - 40 },
        thickness: 0.5,
        color: rgb(0.9, 0.9, 0.9),
      });
    }
    for (let y = 40; y < height - 40; y += gap) {
      page.drawLine({
        start: { x: 40, y },
        end:   { x: width - 40, y },
        thickness: 0.5,
        color: rgb(0.9, 0.9, 0.9),
      });
    }
  },

  checklist: (page: any) => {
    const { width, height } = page.getSize();
    const startY = height - 80;
    for (let i = 0; i < 20; i++) {
      const y = startY - i * 30;
      page.drawRectangle({
        x: 40,
        y,
        width:  20,
        height: 20,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      page.drawLine({
        start: { x: 70, y: y + 10 },
        end:   { x: width - 40, y: y + 10 },
        thickness: 0.5,
        color: rgb(0.8, 0.8, 0.8),
      });
    }
  },

  meeting: (page: any) => {
    const { width, height } = page.getSize();
    const top = height - 40;
    page.drawText("Meeting Notes", { x: width / 2 - 50, y: top, size: 18, color: rgb(0, 0, 0) });

    const cols = [
      { header: "Time",  x: 40 },
      { header: "Topic", x: 150 },
      { header: "Owner", x: 400 },
      { header: "Notes", x: 500 },
    ];
    cols.forEach((c) => page.drawText(c.header, { x: c.x, y: top - 30, size: 12, color: rgb(0, 0, 0) }));
    cols.forEach((c) =>
      page.drawLine({
        start: { x: c.x, y: top - 35 },
        end:   { x: c.x, y: 40 },
        thickness: 0.5,
        color: rgb(0.8, 0.8, 0.8),
      })
    );
  },
} as const;
