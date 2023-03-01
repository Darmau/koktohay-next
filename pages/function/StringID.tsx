function generateId(header: string) {
  const encoded = Buffer.from(header).toString('base64');
  const result = encoded.replace(/[^a-zA-Z]/g, '-');
  return result;
}

export default generateId;