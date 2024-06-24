const API_KEY = '6a65444f74657375333942414a4d6f';

export async function fetchStationInfo(stationId) {
  console.log("🚀 ~ fetchStationInfo ~ stationId:", stationId)
  const response = await fetch(`http://swopenAPI.seoul.go.kr/api/subway/${API_KEY}/json/realtimeStationArrival/0/5/${stationId}`);
  console.log("🚀 ~ fetchStationInfo ~ response:", response)
  const data = await response.json();
  console.log("🚀 ~ fetchStationInfo ~ data:", data)
  return data;
}
