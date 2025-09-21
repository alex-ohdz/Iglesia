import fs from "fs/promises";
import path from "path";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "@backend/lib/db";

export type CarouselRow = RowDataPacket & {
  id: number;
  image_url?: string;
  image?: string;
};

const CAROUSEL_FOLDER = path.join(
  process.cwd(),
  "public",
  "images",
  "home_carrousel"
);

export const listCarouselImages = async () => {
  const result = await query<CarouselRow[]>(
    "SELECT * FROM carrousel ORDER BY id DESC"
  );
  return result.rows;
};

export const saveCarouselImages = async (files: Express.Multer.File[]) => {
  const savedImages: CarouselRow[] = [];

  await fs.mkdir(CAROUSEL_FOLDER, { recursive: true });

  for (const [index, file] of files.entries()) {
    const fileName = `home_carrousel_${Date.now()}_${index}.jpg`;
    const filePath = path.join(CAROUSEL_FOLDER, fileName);
    await fs.writeFile(filePath, file.buffer);

    const relativePath = `/images/home_carrousel/${fileName}`;
    const insertResult = await query<ResultSetHeader>(
      "INSERT INTO carrousel (image_url) VALUES (?)",
      [relativePath]
    );

    const insertedId = insertResult.rows.insertId;
    const record = await findCarouselById(insertedId);

    if (record) {
      savedImages.push(record);
    }
  }

  return savedImages;
};

export const deleteCarouselImage = async (id: number) => {
  const record = await findCarouselById(id);

  if (!record) {
    return null;
  }

  const imagePath = record.image_url ?? record.image;

  if (imagePath) {
    const normalizedPath = imagePath.replace(/^\//, "");
    const absolutePath = path.join(process.cwd(), "public", normalizedPath);

    try {
      await fs.unlink(absolutePath);
    } catch (error) {
      const err = error as NodeJS.ErrnoException;
      if (err.code !== "ENOENT") {
        throw error;
      }
    }
  }

  await query<ResultSetHeader>("DELETE FROM carrousel WHERE id = ?", [id]);
  return record;
};

const findCarouselById = async (id: number) => {
  const result = await query<CarouselRow[]>(
    "SELECT * FROM carrousel WHERE id = ?",
    [id]
  );

  return result.rows[0] ?? null;
};
