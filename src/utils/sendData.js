async function sendData(data) {
  console.log(data);

  const { API_KEY, BASE_URL } = process.env;
  const requestConfig = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "api-key": API_KEY,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/company/payments/hook/notifications`,
      requestConfig
    );
    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} ${response.statusText}`
      );
    }
    const responseData = await response.json();

    console.log(`[${response.status}][API]=`, responseData);
    return responseData;
  } catch (error) {
    console.error("Erro ao fazer a requisição:", error.message);
    throw new Error(`Erro na requisição: ${error.message}`);
  }
}
module.exports = sendData;
