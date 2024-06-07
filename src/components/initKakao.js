const loadKakaoMapScript = () => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve(window.kakao);
      return;
    }

    const script = document.createElement('script');
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=244edd781135db46c2c4a32e6b2b3716&libraries=services';
    script.async = true;
    script.onload = () => {
      resolve(window.kakao);
    };
    script.onerror = (error) => {
      reject(error);
    };

    document.head.appendChild(script);
  });
};

export default loadKakaoMapScript;