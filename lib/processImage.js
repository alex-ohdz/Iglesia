export async function imageToBase64(imageBuffer) {
	const buffer = Buffer.from(imageBuffer);
	return buffer.toString('base64');
  }
  