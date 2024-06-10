function toBase64(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      const reader = new FileReader();
      reader.onloadend = function() {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = reject;
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });
}

async function importAll(r) {
  let images = {};
  for (const path in r) {
    const key = path.replace(/.*\/(.*\.png)$/, '$1');
    const url = r[path].default;
    const base64 = await toBase64(url);
    images[key] = base64;
  }
  return images;
}

export async function weatherIcon(imageName) {
  const allWeatherIcons = await importAll(
    import.meta.glob('@assets/weatherAsset/icons/*.png', { eager: true })
  );

  const icon = allWeatherIcons[imageName];
  if (!icon) {
    console.error(`Icon for ${imageName} not found`);
    return null;
  }

  return icon;
}


export async function weatherIcon_week(imageName) {
  const allWeatherIcons = await importAll(
    import.meta.glob('@assets/weatherAsset/icons/*.png', { eager: true })
  );

  const icon = allWeatherIcons[imageName];
  if (!icon) {
    console.error(`Icon for ${imageName} not found`);
    return null;
  }

  return icon;
}
