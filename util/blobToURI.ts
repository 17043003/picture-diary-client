const blobToURI = (image: Blob): string => {
  const buffer = Buffer.from(image as any);
  const header = buffer.slice(0, 8).reduce((prev, now) => prev + now.toString(16), '');
  const mime = getMimeFromBinaryHeader(header);

  const base64 = buffer.toString('base64');
  return `data:${mime};base64,` + base64;
};

const getMimeFromBinaryHeader = (header: string): string => {
  if (header.includes('ffd8')) {
    return 'image/jpeg';
  } else if ('89504E47') {
    return 'image/png';
  } else if ('47494638') {
    return 'image/gif';
  } else {
    return 'image';
  }
};

export default blobToURI;
