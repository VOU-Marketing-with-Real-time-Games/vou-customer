import AxiosClient from "./ev";

export const getTextToSpeech = async (text: string) => {
  const voiceId = "nPczCjzI2devNBz1zQrb";
  const voiceSettings = {
    stability: 0.8,
    similarity_boost: 0,
  };

  const requestBody = {
    text,
    voice_settings: voiceSettings,
    model_id: "eleven_turbo_v2_5",
  };

  const res = await AxiosClient.post(`/${voiceId}`, requestBody);
  return res.data;
};
